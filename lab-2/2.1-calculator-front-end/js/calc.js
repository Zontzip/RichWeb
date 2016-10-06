  var div = document.createElement('div');
  div.setAttribute('id', 'div');
  var t = document.createTextNode("Calculator");
  div.setAttribute("style", "background-color: grey; width:220px;margin-left:5px;");
  div.appendChild(t);
  document.body.appendChild(div);

  //textarea
  var text = document.createElement('input');
  text.setAttribute('type', 'text');
  text.setAttribute('id', 'text')
  text.setAttribute('style',"margin-left:5px;");
  document.body.appendChild(text);
  var aa = document.getElementById("text").style.width = "220px";
  var a = document.getElementById('text');
  a.value = '0';
  document.write("</br>");

  //buttons
  var button = [];
  for (var i=0; i<20; i++) 
  {
    button[i] = document.createElement('input');
    button[i].setAttribute('type','button');
    button[i].setAttribute('id', i);
    button[i].setAttribute('style',"background-color:grey;height: 30px;border-radius:10px;margin-left:10px;");
    document.body.appendChild(button[i]);
    document.getElementById(i).style.width = "45px";
    if(i > 3 && i < 5)
    {
      document.write("</br>");
      
      document.body.appendChild(button[i]);
    }
    else if (i >= 4 && i < 5) {
      document.write("</br>");
      document.body.appendChild(button[i]);
    }
    else if (i >= 8 && i < 9) {
      document.write("</br>");
      document.body.appendChild(button[i]);
    }
    else if (i >= 12 && i < 13) {
      document.write("</br>");
      document.body.appendChild(button[i]);
    }
    else if (i >= 16 && i < 17) {
      document.write("</br>");
      document.body.appendChild(button[i]);
    }

  }

  //buttons values
var a = document.getElementById(0);		a.value = '(';
    a = document.getElementById(1);		a.value = ')';
    a = document.getElementById(2);		a.value = '+';
    a = document.getElementById(3);		a.value = ':';
    
    a = document.getElementById(4);		a.value = '7';
    a = document.getElementById(5);		a.value = '8';
    a = document.getElementById(6);		a.value = '9';
    a = document.getElementById(7);		a.value = 'x';
    
    a = document.getElementById(8);		a.value = '4';
    a = document.getElementById(9);		a.value = '5';
    a = document.getElementById(10);  a.value = '6';
    a = document.getElementById(11);	  a.value = '-';
    
    a = document.getElementById(12);	  a.value = '1';
    a = document.getElementById(13);	  a.value = '2';
    a = document.getElementById(14);	  a.value = '3';
    a = document.getElementById(15);	  a.value = '+';
    
    a = document.getElementById(16);	  a.value = '0';
    a = document.getElementById(17);	  a.value = '.';
    a = document.getElementById(18);	  a.value = 'C';
    a = document.getElementById(19);	  a.value = '=';