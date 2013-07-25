// Copyright (c)  2013
// Fabian "fabiantheblind" Morón Zirfas
// Permission is hereby granted, free of charge, to any
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to  permit persons to
// whom the Software is furnished to do so, subject to
// the following conditions:
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIO
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// see also http://www.opensource.org/licenses/mit-license.php

// check out this post
// http://aenhancers.com/viewtopic.php?f=8&t=889
//

(function(thisObj){
// basic panel
run(thisObj);

 function run(thisObj){
  // $.localization=true;
var script_file = File($.fileName); // get the location of the scriptfile
var script_file_path = script_file.path; // get the path
// this is global



data =  {
  "settingsSectionName":"exec_by_id",
  "script_version":0.1,
  "website":"https://github.com/fabiantheblind/Execute-Menu-Command-by-ID",
  "issue_tracker":"https://github.com/fabiantheblind/Execute-Menu-Command-by-ID/issues",
      "script_file" :script_file, // get the location of the    scriptfile
    "script_file_path" : script_file_path, // get the path
    "verison_history" : [
 "* 0.1 initial version"
],
    'initial_value':8000 /* this is execute script */,

  icon_info :"\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x1E\x00\x00\x00\x19\b\x06\x00\x00\x00&5\u009E\x1A\x00\x00\x01\x1CIDATx\u00DA\u00EDT;\n\u0083@\x14\u00F4\x009L\x0E\u00E0%\u0084\x1C#E\u00FA\x14jkcg\u00B0\u00CA\x11R\u00E4\x066i\u00C4^,,\u00B4K\x11p]\u00FC\x15f\x07\x14\u0096e\r\u00C1U\u0092\u00C2\u0081\u00D78\u00F3ftV\u00D56l\u00F8\x17\u00E8\u0086a\u00B8\u008E\u00E3\u00A4\u00FC\u00E0\x1A\u00B85\x02w0\u008F\u00A2\u0088\x14E\u00D1\u00CB\x06\x1C4\u00D0.\x16j\u00DB\u00F6\x1D\u00E6\u00DF\f\u00B4\u008B\u00A4\u00B2*O\u00B2\x00BHG)}\u00C9\u00B8#\u0083\u00F2\u00D3N\u00D5\u009B\u00E7\u00F9-\fC}\u00AAv\u00EC\u00AA<\u00ED\u00E1\u00D3\u0099\u00FA\u00BE\u009FM\u00F1\u00D8\u009D\x1D\u00CC\f,\u0099iUU\u008F\u00B6m\u00AF\u0098\x0F\u00E7m\u00A9\x04\u00BB2S\u00D34/\u008C\u00DEC\u00B3r\u00B0\u00DCx\u00CD`\u00EB'\u00C1u]K_.J\u00E9\u0093q\u00A7A\u0093\u00E2\u00D3\x125\u00D8\u009D\x1D\u00DC\u00F7\u00FD\u00AE,K\"\u009Az\u009Ew\u00C6\x19\u008F\x13\u00C7q\u00C6\u00F3\u00D8\u00C1\u00AE\u00A6\u0082\u00A6i\u008Ebp\u0092$U\x10\x04\u00AFqD\x1E;\u00BC\u0087J\u00E5_\u00FF2\u00A1\x15\u00F7\u0095*\u00EF\u00BA\u00CE\x15k\x17\u00EB\u0085F^\u00B1\u00FA\r\u00E80\u00C7\x0B\u00C5\u00CF\x10\u00A8k\x1B6px\x03d\u00E9\u00E3d2q\u00D9)\x00\x00\x00\x00IEND\u00AEB`\u0082"
};
data.images_binary = [data.icon_info];

data.cmdListEn = read_cmd_list();
if(data.cmdListEn === null) return;
var sc = new SettingsControl(data.settingsSectionName);
sc.exec.patch_settings_recieve(data, ["initial_value"]);

///   THIS WILL CHECK IF PANEL IS DOCKABLE OR FLAOTING WINDOW
var win   = buildUI(thisObj );
if ((win !== null) && (win instanceof Window)) {
    win.center();
    win.show();
} // end if win  null and not a instance of window

 function buildUI (thisObj  ) {
        var H = 25; // the height
        var W = 30; // the width
        var G = 5; // the gutter
        var x = G;
    var win = (thisObj instanceof Panel) ? thisObj :  new Window('palette', 'executeCommand',[0,0,G*3+W*5,G*2+H*2],{resizeable: true,name:"executeCommand"});

    if (win !== null) {
        var iconfiles = [];
        for(var i=0; i < data.images_binary.length; i++) {
            iconfiles[i] = new File(data.script_file_path + "/xxxiconfilesxxx"+i+ ".png");
            iconfiles[i].encoding = "BINARY";
            iconfiles[i].open( "w" );
            iconfiles[i].write( data.images_binary[i] );
            iconfiles[i].close();
        }

        var y = G;
        win.command_id_etext = win.add('edittext',[x,y,x+W*4,y + H],data.initial_value);
        x+=W*4+G;

        win.help_bttn = win.add('iconbutton',[x,y,x+W*1,y+H],iconfiles[0]);
        x=G;
        y+=H+G;
        // win.check_box = win.add('checkbox',[x,y,x+W*2,y + H],'check');
        // win.check_box.value = metaObject.setting1;
        win.do_it_button = win.add('button', [x ,y,x+W*4,y + H], 'execute command');
        x+=G+W*4;
        win.find_it_button = win.add('button',[x ,y,x+W*1,y+H],'fc');
        // win.up_button = win.add('button', [x + W*5+ G,y,x + W*6,y + H], 'Up');

        // win.check_box.onClick = function (){
        //     alert("check");
        // };
        win.command_id_etext.onChanging = function (){

          data.initial_value = parseTextToInteger( this.text, "sorry this is not a value",0);
        };

        win.do_it_button.onClick = function () {
            execute_command();

      };

      win.find_it_button.onClick = function(){
        var cmdstr = win.command_id_etext.text; // prompt("Enter the command you are looking for","...");
        var cmd = app.findMenuCommandId(cmdstr);
  if(cmd === 0) {
    alert("These aren't the droids you are looking for");
    return;
  }else{

  alert("This is your ID: " + String(cmd));
   win.command_id_etext.text = String(cmd);
  }

      // find_command();
      };
              win.help_bttn.onClick = function(){
            help_panel('execute_command.jsx v' + data.script_version + ' Help');
        };

            for(var j=0; j< iconfiles.length; j++) {
            iconfiles[j].remove();
            }
    }
    return win;
}

/**
 * got it here https://github.com/fabiantheblind/extendscript/wiki/Read-In-JSON-From-File-And-Eval
 * @return {[type]} [description]
 */
function read_cmd_list () {
    var script_file = File($.fileName); // get the location of the    scriptfile
  var script_file_path = script_file.path; // get the path

  // var file_to_read = File(script_file_path + "/testfile.txt");// this could be reading a textfile
  var file_to_read = File(script_file_path + "/command-list.json");// but we want JSON
  var my_JSON_object = null; // create an empty variable
  //  alert(file_to_read); // This could be interesting
  var content; // this will hold the String content from the file
  if(file_to_read !== false){// if it is really there
        file_to_read.open('r'); // open it
        content = file_to_read.read(); // read it
        // !Achtung! eval is evil
        // Improper use of eval opens up your code for injection attacks
        // http://stackoverflow.com/a/86580
        my_JSON_object =  eval("{"+ content + "}");// now evaluate the string from the file

        alert("You have "+my_JSON_object.length + " commands in your list.\n Open it, edit it. Close the script reopen and you have new commands in it."); // if it all went fine we have now a JSON Object instead of a string call length
        file_to_read.close(); // always close files after reading
        return my_JSON_object;
        }else{

        alert("Commands list is missing or unreachable. It should be here:\n" + script_file_path + "/command-list.json"); // if something went wrong
        return null;
  }
}

function help_panel(title){
var helpText = [];
helpText.push('Execute Command quick help. For further infos go to ' + data.website);
helpText.push('If you run into any bugs please report an issue @ '+ data.issue_tracker);
helpText.push('List is taken from aenhancers post http://aenhancers.com/viewtopic.php?f=8&t=889');

for(var i = 0; i < data.cmdListEn.length;i++){
  var item = data.cmdListEn[i];
  var versionStr = "Works in these app versions:";
  for(var j =0; j < item.appVersions.length;j++){
    switch(item.appVersions[j]){
      case 8:
    versionStr += " CS3, ";
      break;
      case 9:
      versionStr+= " CS4, ";
      break;
      case 10:
      versionStr+= " CS5, CS5.5, ";
      break;
      case 11:
      versionStr+= " CS6, ";
      break;
      case 12:
      versionStr+= " CC ";
      break;
      }
    }
    try{
    helpText.push(versionStr +" "+ localize(item.title) + " --> " + String(item.id) );

      }catch(err){
        // not a localized string
    helpText.push(versionStr +" "+ item.title + " --> " + String(item.id) );
      }
}

helpText.push('');


helpText.push('VERSION HISTORY:');
for(var hist = 0; hist < data.verison_history.length; hist++){
  helpText.push(data.verison_history[hist]);
}



var diag                     = new Window ('dialog',title + ''); // the new window
    diag.preferredSize       =    {'width':600,'height':130};
    diag.supergroup                 = diag.add('group',undefined,'');
    diag.supergroup.orientation     ='column';
    diag.rowhelptext = diag.supergroup.add('group');

    diag.rowhelptext.edittxt = diag.rowhelptext.add('edittext',undefined,helpText.join('\n'),{
                                        multiline:true,
                                        scrolling: true});
    diag.rowhelptext.edittxt.preferredSize = {'width':600,'height':400};

    /* ----------------------------------------------- */
    diag.rowconfirm            = diag.supergroup.add ('group');
    diag.rowconfirm.orientation = 'row';
    diag.rowconfirm.alignment   = 'right';
// ------------ the comfirm or cancel buttons ------------
    diag.rowconfirm.ok               = diag.rowconfirm.add ('button', undefined, 'OK');
    diag.rowconfirm.cancel           = diag.rowconfirm.add ('button', undefined, 'Cancel');
   if (diag.show () == 1){
    return true;
  }else{
    return false;

  }
}

function resetValIfNAN(val,resetVal, theErrorMessage){
    if(isNaN(val) === true){
    val = resetVal;
    // alert(theErrorMessage);
    }
  return val;
}

/**
 * [parseTextToInteger description]
 * @param  {[type]} theText         [description]
 * @param  {[type]} theErrorMessage [description]
 * @param  {[type]} resetVal        [description]
 * @return {[type]}
 */
function parseTextToInteger(theText,theErrorMessage,resetVal){
  var val = Math.abs( parseInt(theText, 10));
    val = resetValIfNAN(val,resetVal,theErrorMessage);
  return val;
}

function find_command () {
  var cmdstr = prompt("Enter the command you are looking for","...");
  var cmd = app.findMenuCommandId(cmdstr);
  if(cmd === 0) {
    alert("These aren't the droids you are looking for");
    return;
  }else{

  alert("This is your ID: " + String(cmd));
  }
  // alert(this.parent.constructor.name);
}
function execute_command(){
// "in function main. From here on it is a straight run"
//

   //  var curComp = app.project.activeItem;
   // if (!curComp || !(curComp instanceof CompItem)){
   //      alert('please select a comp');
   //      return;
   //  }



    // if(curComp.selectedLayers.length < 1){
    //     alert('Please select at least one layer');
    // return;
    //     }


    // app.beginUndoGroup('execute command ' + data.initial_value);

    try{
      app.executeCommand(data.initial_value);
      sc.exec.set_setting_number("initial_value",data.initial_value);
      }catch(err){
        alert("Execution of command " + data.initial_value+ " did not work\n" + err);
      }

// var props = curComp.selectedProperties

    // app.endUndoGroup();
  }
  // development is here
  // https://github.com/fabiantheblind/AESettingsControl
  //
  //
  //
  // Copyright (c)  2013
// Fabian "fabiantheblind" Morón Zirfas
// Permission is hereby granted, free of charge, to any
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to  permit persons to
// whom the Software is furnished to do so, subject to
// the following conditions:
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIO
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// see also http://www.opensource.org/licenses/mit-license.php

/**
 * This is a settings control class
 * Used it at will
 * @param {String} _section the Settings Section Name
 */
function SettingsControl (_section) {
/**
 * Usage:
 *
 *  var data = {
 *   settingsSectionName:"testSettings",
 *   key_string:"astring",
 *   key_int:"ainteger",
 *   key_float:"afloatingpointvalue",
 *   key_boolean:"aboolean"
 * };
 *
 * var sc = new SettingsControl(data.settingsSectionName);
 *
 * test_set();
 * test_get();
 * sc = null;
 *
 *
 *
 * function test_get () {
 *   var resbool = sc.exec.get_setting_boolean( data.key_boolean);
 *   alert("Boolean Value: "+resbool);
 *
 *   var resint = sc.exec.get_setting_int( data.key_int);
 *   alert("Integer Value: "+ resint);
 *
 *     var resfloat = sc.exec.get_setting_int( data.key_float);
 *   alert("Floating Point Value: "+ resfloat);
 *
 *     var resstring = sc.exec.get_setting_string( data.key_string);
 *   alert("String Value: "+ resstring);
 * }
 * function test_set(){
 *    sc.exec.set_setting_boolean( data.key_boolean, false);
 *    sc.exec.set_setting_number( data.key_int, 345);
 *    sc.exec.set_setting_string(data.key_string, "Hello Settings");
 *   sc.exec.set_setting_number(data.key_float, 2.5);
 * }
 *
 */

  this.section = _section;
  this.exec = {
  section : _section,
/**
 * GETTER functions
 */
"get_setting"  : function (key, variable) {
  if((app.settings.haveSetting(this.section,key) === true)){
    variable = app.settings.getSetting(this.section, key);
  }
  return variable;
},

"get_setting_int" : function ( key) {
  var integer = null;
  integer = this.get_setting( key, integer);
  if(integer !== null){
      integer = parseInt(integer,10);
      if(isNaN(integer)){
        integer = null;
      }
  }
  return integer;
},

"get_setting_float"  : function ( key) {
  var floatingpointvalue = null;
  floatingpointvalue = this.get_setting( key, floatingpointvalue);
  if(floatingpointvalue !== null){
      floatingpointvalue = parseFloat(floatingpointvalue);
      if(isNaN(floatingpointvalue)){
        floatingpointvalue = null;
      }
  }
  return floatingpointvalue;
},

"get_setting_boolean"  : function ( key) {
  var bool = null;
  bool = this.get_setting( key, bool);
  if(bool !== null){
    bool = (bool === 'true') ? true : false;
  }
  return bool;
},

"get_setting_string"  : function ( key) {
  var str = null;
  str = this.get_setting( key, str);
  return str;
},


/**
 * SETTER FUNCTIONS
 */


"set_setting" : function ( key, val){
    app.settings.saveSetting(this.section, key, val);
},

"set_setting_number"  : function ( key, value) {
  this.set_setting( key, (String(value)));
},

"set_setting_string"  : function ( key, value) {
  this.set_setting( key, String(value));
},
 set_setting_boolean  : function ( key, value) {
   var val = value ? 'true' : 'false';
   this.set_setting( key , (value ? 'true' : 'false'));
 },
"isInt": function(n) {
   return n % 1 === 0;
},
"detectType":function(value){
  var res = null;
  switch (typeof value) {
    case 'string':
      res = 0;
      break;
    case 'number':
      if(this.isInt(value)){

      res = 1;
      }else{
        res = 2;
      }
      break;
    case 'boolean':
      res = 3;
      break;
    default:
      res = 4;
      break;
  }
  return res;
  },
 "patch_settings_recieve": function(obj, keys){
  /**
   * This function gets an object flat object like this
   * settings = {
   * "radius":100,
   * "doit": true,
   * "name": "Bob"
   * };
   *
   * and compares the key names to a list of keys that should be in the section
   *
   */
      for(var i = 0; i < keys.length;i++){
  for(var key in obj){
    if(obj.hasOwnProperty(key)){
        if(key == keys[i]){
          // do something.
          // not done yet. It needs to identify what type of object it is
          // eg . switch
          var val = null;
          var type = this.detectType(obj[key]);
          if (type === 0) {

            val = this.get_setting_string(keys[i]);
            if(val !== null){
              obj[key] = val;
            }

            }else if(type === 1){
            val = this.get_setting_int(keys[i]);
            if(val !== null){
              obj[key] = val;
            }
            }else if (type === 2) {
            val = this.get_setting_float(keys[i]);
            if(val !== null){
              obj[key] = val;
            }
            }else if (type ===3) {
            val = this.get_setting_boolean(keys[i]);
            if(val !== null){
              obj[key] = val;
            }
            } else if(type === 4){
            }
        }
      }
    }
  }
 }
};
} // end of settings control
 }// close run

})(this);