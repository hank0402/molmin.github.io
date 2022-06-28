function $(x){
	return document.getElementById(x);
}
function getParam(paramName) { 
	paramValue="",isFound=!1; 
	if(this.location.search.indexOf("?")==0 && this.location.search.indexOf("=")>1) { 
		arrSource=unescape(this.location.search).substring(1,this.location.search.length).split("&"),i=0; 
		while(i<arrSource.length && !isFound)
			arrSource[i].indexOf("=")>0 && arrSource[i].split("=")[0].toLowerCase()==paramName.toLowerCase() && 
				(paramValue=arrSource[i].split("=")[1], isFound=!0), i++;
	} 
	return paramValue=="" && (paramValue=null), paramValue;
}
function message(s){
	mdui.snackbar({message:s,position:'bottom'});
}
function copy(str){
	const text_area=document.createElement('textarea');
	document.body.appendChild(text_area);
	text_area.setAttribute('id','copier');
	$('copier').value=str;
	text_area.select();
	document.execCommand('copy');
	document.body.removeChild(text_area);
	message('内容已复制到剪贴板');
}
function loadfile(filename,func){
	let url=filename;
	let httpRequest=new XMLHttpRequest();
	httpRequest.open('GET',url,true);
	httpRequest.send();
	httpRequest.onreadystatechange=function(){
		if (httpRequest.readyState==4 && httpRequest.status==200) {
			func(httpRequest.responseText);
		}
	};
}

function markdown(file){
	var result="";
	var titlegrade=0;
	var inmathjax=false,instrong=false,inem=false,
		ininlinecode=false;
	for(var i=0;i<file.length;i++){
		if(i==0||(file.charAt(i-1)=='\n'&&i>=2&&file.charAt(i-2)=='\n')){
			if(file.charAt(i)=='#'){
				var tot=0;
				while(file.charAt(i)=='#')i++,tot++;
				result=result+"<h"+tot+">";
				titlegrade=tot;
				continue;
			}
			else{
				result=result+"<p>";
				titlegrade=0;
			}
		}
		if(file.charAt(i)=='\n'&&file.charAt(i-1)!='\n'&&file.charAt(i+1)!='\n')
			result=result+" ";
		if(file.charAt(i)!='\n'){
			var ch=file.charAt(i);
			if(ch=='$'){
				if(inmathjax)result=result+"'>";
				else result=result+"<img src='https://latex.codecogs.com/svg.latex?";
				inmathjax=!inmathjax;
			}
			else if(file.charAt(i)=='`'){
				if(ininlinecode)result=result+"</div>";
				else result=result+"<div class='code-inline'>";
				ininlinecode=!ininlinecode;
			}
			else if(file.charAt(i)=='*'){
				var total=1;
				while(file.charAt(i+1)=='*')i++,total++;
				if(total==1){
					if(inem)result=result+"</em>";
					else result=result+"<em>";
					inem=!inem;
				}
				if(total==2){
					if(instrong)result=result+"</strong>";
					else result=result+"<strong>";
					instrong=!instrong;
				}
				if(total==3){
					if(inem){
						if(introng)result=result+"</em></strong>";
						else result=result+"</em><strong>";
					}
					else{
						if(instrong)result=result+"</strong><em>";
						else result=result+"<strong><em>";
					}
					inem=!inem;
					instrong=!instrong;
				}
			}
			else result=result+file.charAt(i);
		}
		if(i==file.length-1||(file.charAt(i+1)=='\n'&&file.charAt(i+2)=='\n')){
			if(titlegrade==0)result=result+"</p>";
			else result=result+"</h"+titlegrade+">";
		}
	}
	return result;
}