// var script = document.createElement('script');
// script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

var doc = new jsPDF();
var specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};


$('#cmd').click(function () {

    doc.fromHTML($('#savedItinerary').html(), 15, 15, {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    doc.save('sample-file.pdf');
    console.log("hi!")
});

// var doc = new jsPDF();          
// var elementHandler = {
//   '#ignorePDF': function (element, renderer) {
//     return true;
//   }
// };
// var source = window.document.getElementsById("savedItinerary");
// doc.fromHTML(
//     source,
//     15,
//     15,
//     {
//       'width': 180,'elementHandlers': elementHandler
//     });

// doc.output("dataurlnewwindow");