"use strict";
(function(root) {
  function parseCSV(source) {
    if (typeof source !== "string" || source.length > 100000) {
      throw new Error("Paste a text sample of at most 100,000 characters.");
    }
    var rows = [], row = [], cell = "", quoted = false, afterQuote = false;
    for (var i=0; i<source.length; i++) {
      var c = source[i];
      if (quoted) {
        if (c === '"' && source[i+1] === '"') {cell+='"';i++;}
        else if (c === '"') {quoted=false; afterQuote=true;}
        else cell+=c;
      } else if (afterQuote) {
        if (c === ',') {row.push(cell);cell="";afterQuote=false;}
        else if (c === '\n' || c === '\r') {
          row.push(cell); rows.push(row); row=[];cell="";afterQuote=false;
          if(c==='\r' && source[i+1]==='\n')i++;
        } else if(c!==' ' && c!=='\t') throw new Error("Unexpected text after a closing quote.");
      } else if(c==='"') {
        if(cell!=="")throw new Error("Unexpected quote inside an unquoted field.");
        quoted=true;
      } else if(c===',') {row.push(cell);cell="";}
      else if(c==='\n'||c==='\r') {
        row.push(cell);rows.push(row);row=[];cell="";
        if(c==='\r' && source[i+1]==='\n')i++;
      } else cell+=c;
    }
    if(quoted)throw new Error("Unclosed quoted field.");
    if(afterQuote || cell.length || row.length) {row.push(cell);rows.push(row);}
    if(rows.length>1000)throw new Error("Limit your sample to 1,000 rows.");
    return rows;
  }
  function auditCSV(source) {
    var rows=parseCSV(source);
    if(!rows.length)return {columns:0,records:0,blankCells:0,widthErrors:0,duplicateRecords:0,headerDuplicates:0};
    var header=rows[0],seenHeaders=new Set(header.map(function(v){return v.trim().toLowerCase();}));
    var duplicateHeaders=header.length-seenHeaders.size;
    var seen=new Set(),duplicates=0,blank=0,width=0;
    for(var i=1;i<rows.length;i++){
      var r=rows[i]; if(r.length!==header.length)width++;
      blank+=r.filter(function(v){return v.trim()==="";}).length;
      var key=JSON.stringify(r);
      if(seen.has(key))duplicates++;else seen.add(key);
    }
    return {columns:header.length,records:Math.max(0,rows.length-1),blankCells:blank,
      widthErrors:width,duplicateRecords:duplicates,headerDuplicates:duplicateHeaders};
  }
  root.CSVQuickCheck={parseCSV:parseCSV,auditCSV:auditCSV};
  if(typeof module!=="undefined"&&module.exports)module.exports=root.CSVQuickCheck;
})(typeof window!=="undefined"?window:globalThis);
