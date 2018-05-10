'use strict';


var mongoose = require('mongoose'),
   Data = mongoose.model('Data');
var fs = require('fs');
var convert = require('mongoose_schema-json');
var archiver = require('archiver');
const varSplit="\\.";
const nullDataValue='';
const defaultDataFilename='_data';
const dataPrefix=''; //prefix for items in the data array
const dataFileLocation='/home/openserver/';
const dataFolder='data/';

exports.insertData = function(req, res) {
  var newData = new Data(req.body);
  
  var reqBody=req.body;
  newData.save(function(err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};
exports.getData = function(studyId,fileFormat,fileSplitVar,startDate,endDate) {
	
	if(typeof studyId == 'undefined' || !studyId)
		throw new Error("Error: studyId must be specified");
	var findObject={};
    var  dataMap={};
    var processedData=[];
    var pos=0;
    var rowSplitString='\t';
	findObject.studyId=studyId;
	if(typeof startDate !== 'undefined' && startDate)
	{
		findObject.createdDate={};
		findObject.createdDate.$gt=new Date(startDate);
	}
	if( typeof endDate !== 'undefined' && endDate)
	{
		if(typeof findObject.createdDate == 'undefined' || !findObject.createdDate){
		findObject.createdDate={};}
		findObject.createdDate.$lt=new Date(endDate);
	}
	if(fileFormat=='csv')
	{
		rowSplitString=',';
	}
	if(fileFormat=='tab')
	{
		rowSplitString='\t';
	}
  Data.find(findObject, function(err, study) {
      if (err) {
          return err
      }
      else {
		for(var x=0;x<study.length;x++)
		  {
			  var reqBody = JSON.parse(JSON.stringify(study[x]));
		  	getInitialVarIdMap(reqBody,'',dataMap,pos);
		  }
		  for(var x=0;x<study.length;x++)
		  {
			 reqBody = JSON.parse(JSON.stringify(study[x]));
		  	loadDataArray(reqBody,dataMap,processedData);
		  }
		  if(dataMap.keys(map).length>0){
		  return writeDataArrayToFile(processedData,dataMap,fileSplitVar,rowSplitString);}
		  else
		  {
			  return null;
		  }
      }
  });
};


exports.newStudyInstance = function(req, res) {
	var study ={
		studyId: req.params.studyId,
		conditions: req.params.conditions,
		userAgent: req.headers['user-agent'],
		referrer : req.header('Referer')
	};
  var newStudy = new Study(study);
  newStudy.save(function(err, study) {
    if (err)
      res.send(err);
    res.json(study);
  });
};
var getInitialVarIdMap= function(data,prefix,map,pos)
{
	Object.keys(data).forEach(function(key) {
		
		if(key[0]=='_')
		{
			return;
		}
	var item = data[key];
	if(key!='data') //TODO: what to do if collision happens
		{
			if(map[key]==null){
			map[key]=pos;
			pos++;	
		}
		}	
	});
	var item=data.data;
	try {item= JSON.parse(item);}
	catch(e) {console.log(e);}
	item.forEach(function(row) {
		    pos=getVarIdMap(row,dataPrefix,map,pos);
			
		});
}
var getVarIdMap= function(data,prefix,map,pos)
{
	if(Array.isArray(data)  )
	{
		var x=1;
		data.forEach(function(row) {
			if(Object.keys(row).length >0 && typeof row=='object'){
		    pos=getVarIdMap(row,prefix+x+varSplit,map,pos);
		
		}
		else
		{
			if(map[prefix+x]==null){
			map[prefix+x]=pos;
			pos++;
		}
		}
			x++;
		});
		return pos;
	}
	
		Object.keys(data).forEach(function(key) {
			var item = data[key];
			if(item==null)
			{
				return pos;
			}
			
		
		try {item= JSON.parse(item);}
		catch(e) {}
		/*if(JSON.parse(item))
		{
			item=JSON.parse(item);
		}*/
		if(Array.isArray(item))
		{
			    pos=getVarIdMap(item,prefix+key+varSplit,map,pos);
		}
		else
		{
			if(typeof item =='object' )
			{
				Object.keys(item).forEach(function(key2) {
					var item2 = item[key2];
					if(typeof item2 =='object' ){
				pos=getVarIdMap(item[key2],prefix+key+varSplit+key2+varSplit,map,pos);}
				else
				{
					if(map[prefix+key+varSplit+key2]==null){
					map[prefix+key+varSplit+key2]=pos;
					pos++;}
				}
				});
			}
				else
				{
			if(map[prefix+key]==null) //TODO: what to do if collision happens
			{
				map[prefix+key]=pos;
				pos++;
				
			}}
		}
		});
		return pos;
	}
var loadDataArray= function(data,map,processedData)
{
	var baseRow = new Array(Object.keys(map).length);  //row prepopulated with fields common to all rows
	baseRow.fill(nullDataValue);
	
	Object.keys(data).forEach(function(key) 
	{
		if( key!='data')
		{
			baseRow[map[key]]=data[key];
		}
	});	
	var item=data.data;
	try {item= JSON.parse(item);}
	catch(e) {}
	item.forEach(function(row) {
		var newRow=baseRow.slice();
		loadRow(row,dataPrefix,map,newRow);
		processedData.push(newRow);
	});
};

var loadRow= function(data,prefix,map,row)
{
	if( Array.isArray(data))
	{
		var x=1;
		data.forEach(function(element) {
			if(typeof element !='object')
			{
				var mapResult=map[prefix+x];
				row[mapResult]=element;
			}
			else{
		    loadRow(element,prefix+x+varSplit,map,row);}
			x++;
		});
		return;
	}

	Object.keys(data).forEach(function(key) {
	var item = data[key];
	try {item= JSON.parse(item);}
	catch(e) {}
	if(item==null)
	{
		return;
	}
	/*if(JSON.parse(item))
	{
		item=JSON.parse(item);
	}*/
	if(Array.isArray(item))
	{
		  loadRow(item,prefix+key+varSplit,map,row);
	}
	else
	{
		if(typeof item =='object' )
		{
			Object.keys(item).forEach(function(key2) {
				var item2=item[key2];
				if(typeof item2 !='object')
				{
					if(map[prefix+key+varSplit+key2]!=null) //TODO: what to do if collision happens
					{
						var mapResult=map[prefix+key+varSplit+key2];
						row[mapResult]=item2;
					}
				}
				else{
				loadRow(item2,prefix+key+varSplit+key2+varSplit,map,row);}
			});
		}
			else
			{
				if(map[prefix+key]!=null) //TODO: what to do if collision happens
				{
					var mapResult=map[prefix+key];
					row[mapResult]=item;
				}
	}
	}
	});
};
var  getDateString= function(daysFromPresent)
    {
        var date = new Date();
		date.setDate(date.getDate()+daysFromPresent)
        var dd = date.getDate();
        var mm = date.getMonth();
        var yyyy = date.getFullYear();

        var dateString= dd+'.'+mm+'.'+yyyy;

        return dateString;   
    }
	var zipFolder= function(zipPath,zipFolder)
	{
		var output = fs.createWriteStream(zipPath);
		var archive = archiver('zip', {
		  zlib: { level: 9 } // Sets the compression level.
		});
 
		// listen for all archive data to be written
		// 'close' event is fired only when a file descriptor is involved
		output.on('close', function() {
		  console.log(archive.pointer() + ' total bytes');
		  console.log('archiver has been finalized and the output file descriptor has closed.');
		});
 
		// This event is fired when the data source is drained no matter what was the data source.
		// It is not part of this library but rather from the NodeJS Stream API.
		// @see: https://nodejs.org/api/stream.html#stream_event_end
		output.on('end', function() {
		  console.log('Data has been drained');
		});
 
		// good practice to catch warnings (ie stat failures and other non-blocking errors)
		archive.on('warning', function(err) {
		  if (err.code === 'ENOENT') {
		    // log warning
		  } else {
		    // throw error
		    throw err;
		  }
		});
 
		// good practice to catch this error explicitly
		archive.on('error', function(err) {
		  throw err;
		});
 
		// pipe archive data to the file
		archive.pipe(output);
		archive.directory(zipFolder, false);
		archive.finalize();
	}	
var writeDataArrayToFile= function(dataArray,map,fileSplitVar, rowSplitString)
{
	
    
	var dataString='';
	var headers='';
	var splitPos=-1;
	var fileMap={};
	if(rowSplitString==null)
	{
		rowSplitString='\t';
	}
	//fileSplitVar='createdDate';
	var currentDate=getDateString(0);
	var currentTime=new Date();
	currentTime=currentTime.getTime();
	var dataPath=dataFolder+currentDate+'/';
	var filePrefix=dataFileLocation+dataPath;
	if(!fs.existsSync(filePrefix))
	{
		fs.mkdirSync(filePrefix);
	}
	filePrefix+=+ currentTime+'/';
	fs.mkdirSync(filePrefix);
	var reverseMap=  new Array(Object.keys(map).length);
	Object.keys(map).forEach(function(key) {
		reverseMap[map[key]]=key;
	});
		//dataArray.unshift(reverseMap);
		var initialRow='';
		for(var y=0;y<reverseMap.length;y++)
			{
				initialRow+=reverseMap[y]+rowSplitString;
			}
			initialRow+='\n';
			if(fileSplitVar!=null && fileSplitVar.length>0 && map[fileSplitVar]!=null)
			{
				splitPos=map[fileSplitVar];
			}
			else{
			    fs.writeFile(filePrefix+defaultDataFilename+".txt", initialRow, function(err) {
			        if(err) {
			            return console.log(err);
			        }
			    });
			}
	for(var x=0;x<dataArray.length;x++)
		{
			var dataRow=dataArray[x];
			for(var y=0;y<dataRow.length;y++)
				{
					dataString+=dataRow[y]+rowSplitString;
				}
				dataString+='\n';
				var filename=defaultDataFilename;
				if(splitPos>-1 && fileMap[dataRow[splitPos]]==null)
					{
						filename=dataRow[splitPos];
						if(filename.length==0)
						{
							filename=defaultDataFilename;
						}
					    fs.writeFile(filePrefix+filename+".txt", initialRow, function(err) {
					        if(err) {
					            return console.log(err);
					        }
					    });
					}
				    fs.appendFile(filePrefix+filename+".txt", dataString, function(err) {
				        if(err) {
				            return console.log(err);
				        }

				        //console.log("The row was saved!");
				    });
					dataString='';
					var dateZipFile=dataFileLocation+dataFolder+currentDate+'/'+currentTime+'.zip';
					zipFolder(dateZipFile,filePrefix);
					return dataFolder+currentDate+'/'+currentTime+'.zip';
			}
			
		

   
	
};