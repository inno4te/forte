/**
 * ============================================================
 *  MaD — Make a Difference | Google Apps Script Backend
 * ============================================================
 *  What this does:
 *    - Stores every MaD Action, Submission, Idea, and Vote in a
 *      shared Google Sheet so everyone sees the same data.
 *    - Serves JSON to the MaD website via doGet / doPost.
 *
 *  How to deploy (5 minutes):
 *    1. Open https://sheets.google.com — create a new sheet named
 *       "MaD Backend". Copy the sheet URL.
 *    2. In that sheet: Extensions → Apps Script.
 *    3. Delete the placeholder code and paste this ENTIRE file.
 *    4. Save (💾). Run the function `setup()` once (Run menu).
 *       Grant permissions when prompted.
 *    5. Click "Deploy" → "New deployment" → gear icon → "Web app".
 *       Description: MaD Backend v1
 *       Execute as: Me
 *       Who has access: Anyone
 *    6. Click Deploy. Copy the Web App URL.
 *    7. Paste that URL into index.html at the top:
 *          const MAD_BACKEND_URL = "PASTE_HERE";
 *    8. Re-deploy the website. Done — everyone now shares data.
 *
 *  Sheets created automatically:
 *    Stories | Actions | Submissions | Ideas | Votes | Log
 *
 *  API endpoints:
 *    GET  ?action=stories       → all approved stories
 *    GET  ?action=ideas         → all ideas
 *    GET  ?action=actions       → all MaD action commitments
 *    GET  ?action=submissions   → pending submissions (admin)
 *    GET  ?action=all           → everything
 *    POST { type:'action',      payload:{...} }  → record MaD action
 *    POST { type:'submission',  payload:{...} }  → new story submission
 *    POST { type:'idea',        payload:{...} }  → new idea in market
 *    POST { type:'vote',        payload:{ideaId} } → +1 vote on idea
 *    POST { type:'approve',     payload:{submissionId, admin} }
 *    POST { type:'reject',      payload:{submissionId, admin} }
 *    POST { type:'promote',     payload:{ideaId, admin} }
 * ============================================================
 */

var SHEETS = {
  STORIES:     'Stories',
  ACTIONS:     'Actions',
  SUBMISSIONS: 'Submissions',
  IDEAS:       'Ideas',
  VOTES:       'Votes',
  LOG:         'Log'
};

var HEADERS = {
  Stories:     ['id','title','excerpt','content','author','category','region','country','countryCode','imageUrl','source','mads','likes','hasGroup','trending','status','createdAt'],
  Actions:     ['id','ref','targetId','targetTitle','targetSource','actions','money','timeHours','timeSlot','timeMode','skills','skillsBio','connectMsg','signMsg','groupIdea','shareChannels','name','email','country','anonymous','agreeContact','submittedAt'],
  Submissions: ['id','type','title','content','link','category','region','country','name','email','anonymous','photoName','status','createdAt','reviewedAt','reviewedBy'],
  Ideas:       ['id','title','description','proposer','country','countryCode','category','tags','votes','status','promotedAt','createdAt'],
  Votes:       ['id','ideaId','voterHash','votedAt'],
  Log:         ['when','endpoint','payload','result']
};

/* -------------------- SETUP -------------------- */
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(HEADERS).forEach(function(name) {
    var sheet = ss.getSheetByName(name);
    if (!sheet) sheet = ss.insertSheet(name);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS[name]);
      sheet.getRange(1,1,1,HEADERS[name].length).setFontWeight('bold').setBackground('#FACC15');
      sheet.setFrozenRows(1);
    }
  });
  // Remove default Sheet1 if empty
  var s1 = ss.getSheetByName('Sheet1');
  if (s1 && s1.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(s1);
  SpreadsheetApp.getUi().alert('✅ MaD Backend ready. Now deploy this as a Web App.');
}

/* -------------------- HELPERS -------------------- */
function _ss() { return SpreadsheetApp.getActiveSpreadsheet(); }
function _sheet(name) {
  var sheet = _ss().getSheetByName(name);
  if (!sheet) {
    sheet = _ss().insertSheet(name);
    sheet.appendRow(HEADERS[name] || []);
  }
  return sheet;
}
function _uid(prefix) { return prefix + '_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2,7); }
function _now() { return new Date().toISOString(); }
function _json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
function _log(endpoint, payload, result) {
  try {
    _sheet('Log').appendRow([_now(), endpoint, JSON.stringify(payload).slice(0,500), JSON.stringify(result).slice(0,500)]);
  } catch(e) {}
}
function _rowsToObjects(sheet) {
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  var headers = data[0];
  return data.slice(1).map(function(row) {
    var obj = {};
    headers.forEach(function(h, i) {
      var v = row[i];
      if (h === 'actions' || h === 'skills' || h === 'shareChannels' || h === 'tags') {
        try { obj[h] = v ? JSON.parse(v) : []; } catch(e) { obj[h] = String(v || '').split(',').filter(Boolean); }
      } else if (h === 'anonymous' || h === 'agreeContact' || h === 'hasGroup' || h === 'trending') {
        obj[h] = (v === true || v === 'true' || v === 'TRUE');
      } else if (h === 'mads' || h === 'likes' || h === 'votes') {
        obj[h] = Number(v) || 0;
      } else {
        obj[h] = v;
      }
    });
    return obj;
  });
}

/* -------------------- GET (READ) -------------------- */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || 'all';
  var result = { ok:true, ts:_now() };
  try {
    if (action === 'stories' || action === 'all') result.stories = _rowsToObjects(_sheet('Stories'));
    if (action === 'ideas' || action === 'all')   result.ideas = _rowsToObjects(_sheet('Ideas'));
    if (action === 'actions' || action === 'all') {
      var acts = _rowsToObjects(_sheet('Actions'));
      // Redact PII on public reads (email always hidden; name hidden if anonymous)
      result.actions = acts.map(function(a) {
        return {
          id:a.id, ref:a.ref, targetId:a.targetId, targetTitle:a.targetTitle,
          actions:a.actions, name:a.anonymous ? 'Anonymous' : (a.name || 'MaD Supporter'),
          country:a.country, submittedAt:a.submittedAt
        };
      });
    }
    if (action === 'submissions' || action === 'all') result.submissions = _rowsToObjects(_sheet('Submissions'));
    _log('GET/'+action, e && e.parameter, { ok:true });
    return _json(result);
  } catch (err) {
    _log('GET/'+action+'/ERROR', e && e.parameter, err.message);
    return _json({ ok:false, error:err.message });
  }
}

/* -------------------- POST (WRITE) -------------------- */
function doPost(e) {
  var payload = {}, type = '';
  try {
    var body = e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    type = body.type || '';
    payload = body.payload || {};
    var result;
    switch (type) {
      case 'action':     result = _handleAction(payload); break;
      case 'submission': result = _handleSubmission(payload); break;
      case 'idea':       result = _handleIdea(payload); break;
      case 'vote':       result = _handleVote(payload); break;
      case 'approve':    result = _handleApprove(payload); break;
      case 'reject':     result = _handleReject(payload); break;
      case 'promote':    result = _handlePromote(payload); break;
      default:           result = { ok:false, error:'Unknown type: ' + type };
    }
    _log('POST/'+type, payload, result);
    return _json(result);
  } catch (err) {
    _log('POST/'+type+'/ERROR', payload, err.message);
    return _json({ ok:false, error:err.message });
  }
}

/* -------------------- ACTION HANDLERS -------------------- */
function _handleAction(p) {
  var sheet = _sheet('Actions');
  var id = _uid('a');
  var d = p.details || {};
  sheet.appendRow([
    id, p.ref || '', p.target && p.target.id, p.target && p.target.title, p.target && p.target.source,
    JSON.stringify(p.actions || []),
    d.money && d.money.amount || '', d.time && d.time.hours || '', d.time && d.time.slot || '', d.time && d.time.mode || '',
    JSON.stringify(d.skills && d.skills.list || []), d.skills && d.skills.bio || '',
    d.connect && d.connect.message || '', d.sign && d.sign.message || '', d.group && d.group.idea || '',
    JSON.stringify(d.share && d.share.channels || []),
    p.contact && p.contact.name || '', p.contact && p.contact.email || '', p.contact && p.contact.country || '',
    !!(p.contact && p.contact.anon), !!(p.contact && p.contact.agreeContact),
    _now()
  ]);
  // Bump MaD count on the story if it exists
  if (p.target && p.target.id) _bumpMads(p.target.id);
  return { ok:true, id:id, ref:p.ref };
}

function _bumpMads(storyId) {
  var sheet = _sheet('Stories');
  var data = sheet.getDataRange().getValues();
  var idxId = data[0].indexOf('id'), idxMads = data[0].indexOf('mads');
  for (var i = 1; i < data.length; i++) {
    if (data[i][idxId] === storyId) {
      sheet.getRange(i+1, idxMads+1).setValue((Number(data[i][idxMads]) || 0) + 1);
      return;
    }
  }
}

function _handleSubmission(p) {
  var id = _uid('sub');
  _sheet('Submissions').appendRow([
    id, p.type || 'story', p.title || '', p.content || '', p.link || '',
    p.category || '', p.region || '', p.country || '',
    p.name || '', p.email || '', !!p.anon, p.photoName || '',
    'PENDING', _now(), '', ''
  ]);
  return { ok:true, id:id };
}

function _handleIdea(p) {
  var id = _uid('i');
  _sheet('Ideas').appendRow([
    id, p.title || '', p.description || '', p.proposer || 'Anonymous',
    p.country || '', p.countryCode || '', p.category || '',
    JSON.stringify(p.tags || []),
    1, 'VOTING', '', _now()
  ]);
  return { ok:true, id:id };
}

function _handleVote(p) {
  var sheet = _sheet('Ideas');
  var data = sheet.getDataRange().getValues();
  var idxId = data[0].indexOf('id'), idxVotes = data[0].indexOf('votes');
  for (var i = 1; i < data.length; i++) {
    if (data[i][idxId] === p.ideaId) {
      var newVotes = (Number(data[i][idxVotes]) || 0) + 1;
      sheet.getRange(i+1, idxVotes+1).setValue(newVotes);
      // Log the vote (fingerprint by hash of email/session if provided)
      _sheet('Votes').appendRow([_uid('v'), p.ideaId, p.voterHash || 'anon', _now()]);
      return { ok:true, votes:newVotes };
    }
  }
  return { ok:false, error:'Idea not found' };
}

function _handleApprove(p) {
  var subSheet = _sheet('Submissions');
  var storySheet = _sheet('Stories');
  var data = subSheet.getDataRange().getValues();
  var headers = data[0];
  var idxId = headers.indexOf('id'), idxStatus = headers.indexOf('status');
  var idxReviewed = headers.indexOf('reviewedAt'), idxReviewer = headers.indexOf('reviewedBy');
  for (var i = 1; i < data.length; i++) {
    if (data[i][idxId] === p.submissionId) {
      subSheet.getRange(i+1, idxStatus+1).setValue('APPROVED');
      subSheet.getRange(i+1, idxReviewed+1).setValue(_now());
      subSheet.getRange(i+1, idxReviewer+1).setValue(p.admin || 'admin');
      // Copy into Stories
      var sub = {}; headers.forEach(function(h,j) { sub[h] = data[i][j]; });
      var newId = _uid('s');
      storySheet.appendRow([
        newId, sub.title, (sub.content || '').slice(0,140), sub.content,
        sub.anonymous ? 'Anonymous' : (sub.name || 'Community'),
        sub.category, sub.region, sub.country, '',
        '', 'User Submitted', 0, 0, false, false, 'APPROVED', _now()
      ]);
      return { ok:true, newStoryId:newId };
    }
  }
  return { ok:false, error:'Submission not found' };
}

function _handleReject(p) {
  var sheet = _sheet('Submissions');
  var data = sheet.getDataRange().getValues();
  var idxId = data[0].indexOf('id'), idxStatus = data[0].indexOf('status');
  for (var i = 1; i < data.length; i++) {
    if (data[i][idxId] === p.submissionId) {
      sheet.getRange(i+1, idxStatus+1).setValue('REJECTED');
      return { ok:true };
    }
  }
  return { ok:false, error:'Submission not found' };
}

function _handlePromote(p) {
  var ideaSheet = _sheet('Ideas');
  var storySheet = _sheet('Stories');
  var data = ideaSheet.getDataRange().getValues();
  var headers = data[0];
  var idxId = headers.indexOf('id'), idxStatus = headers.indexOf('status'), idxPromoted = headers.indexOf('promotedAt');
  for (var i = 1; i < data.length; i++) {
    if (data[i][idxId] === p.ideaId) {
      ideaSheet.getRange(i+1, idxStatus+1).setValue('PROMOTED');
      ideaSheet.getRange(i+1, idxPromoted+1).setValue(_now());
      var idea = {}; headers.forEach(function(h,j) { idea[h] = data[i][j]; });
      var newId = _uid('s');
      storySheet.appendRow([
        newId, '[IDEA → PROJECT] ' + idea.title, (idea.description || '').slice(0,140), idea.description,
        idea.proposer, idea.category, 'Africa', idea.country, idea.countryCode,
        '', 'MaD Editorial', 0, 0, false, true, 'APPROVED', _now()
      ]);
      return { ok:true, newStoryId:newId };
    }
  }
  return { ok:false, error:'Idea not found' };
}
