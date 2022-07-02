function gettags(texts,color){
	var result="";
	for(var i=0;i<texts.length;i++){
		if(i)result=result+"&nbsp;";
		result=result+"<span class='tag' style='background: "+color+";'>"+texts[i]+"</span>";
	}
	return result;
}
function difficulty(x){
	if(x==0)return "<span class='tag' style='background: #bfbfbf;'>暂未评定</span>";
	if(x==1)return "<span class='tag' style='background: #fe4c61;'>入门</span>";
	if(x==2)return "<span class='tag' style='background: #f39c11;'>普及-</span>";
	if(x==3)return "<span class='tag' style='background: #ffc116;'>普及/提高-</span>";
	if(x==4)return "<span class='tag' style='background: #52c41a;'>普及+/提高</span>";
	if(x==5)return "<span class='tag' style='background: #3498db;'>提高+/省选-</span>";
	if(x==6)return "<span class='tag' style='background: #9d3dcf;'>省选/NOI-</span>";
	if(x==7)return "<span class='tag' style='background: #11207e;'>NOI/NOI+</span>";
	if(x==8)return "<span class='tag' style='background: #052242;'>CTSC/IOI</span>";
}