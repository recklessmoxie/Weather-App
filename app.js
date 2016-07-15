getLocation();

//pulls user's location information from ip-api and passes it into two other functions which call on the Open Weather API//
function getLocation() {
  $.ajax({
    url: 'http://ip-api.com/json',
    method: 'GET',
    data: {},
    dataType: 'json',
    success: function (data) {
      $local = data.city + ', ' + data.region;
      setConditions($local);
    },
    error: function (err) {
      console.log(err)
    }
  });
}

//sets the background image, draws circle image, and fills it with the user's temp. Routes data to various functions//
function setConditions(city) {
  $.ajax({
    url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city +
      '&units=metric&APPID=b13822c4653dbf64c47f5d1ca4177324',
    method: 'GET',
    data: {},
    dataType: 'json',
    success: function (data) {

      //temp data creates the background image, and displays the temp in an html element//
      $tempC = data.main.temp;
      $temp = Math.round(data.main.temp);
      $tempF = Math.round((data.main.temp * 9) / 5 + 32);
      $('#current').append(data.weather[0].description);
      $('#location').append($local);
      $('#pctHumidity').append(data.main.humidity + "%");
      $displayTempF(data);
      backgroundImage(data);
      setIcon(data);

      //variable/function to display date and time data//
      $utcSeconds = data.dt,
        $time = new Date(0),
        $time.setUTCSeconds($utcSeconds),
        $('#time').append($time);
    },
    error: function (err) {
      console.log(err)
    }
  });
}

// variables for dynamically generated Trianglify background images
var defaults = Trianglify({
  cell_size: 60,
  variance: 0.74,
  x_colors: 'random',
  y_colors: 'random',
  stroke_width: 1.51,
  width: window.innerWidth,
  height: window.innerHeight,
  seed: Math.seedrandom('added entropy', {
    entropy: true
  })
});

var midPurple = Trianglify({
  cell_size: 60,
  variance: 0.74,
  width: window.innerWidth,
  height: window.innerHeight,
  x_colors: ['#cf7dd1', '#c274ce', '#b56bcb', '#a762c8', '#9958c4',
    '#8d51bf', '#804bba', '#7445b5', '#683fb0'
  ],
  y_colors: 'Purples',
  seed: Math.seedrandom('added entropy', {
    entropy: true
  })
});

var lightPurple = Trianglify({
  cell_size: 60,
  variance: 0.74,
  width: window.innerWidth,
  height: window.innerHeight,
  x_colors: ['#ffd1ff', '#fdc6fd', '#fabcfa', '#f7b2f6', '#f3a7f3',
    '#ed9fed', '#e695e7', '#de8ee1', '#d786db'
  ],
  y_colors: 'Purples',
  seed: Math.seedrandom('added entropy', {
    entropy: true
  })
});

var darkPurple = Trianglify({
  cell_size: 60,
  variance: 0.74,
  width: window.innerWidth,
  height: window.innerHeight,
  x_colors: ['#7645b5', '#6e46b1', '#674aaf', '#624fae', '#5e57ad',
    '#595bb0', '#5461b4', '#5066b9', '#4c6dbf'
  ],
  y_colors: 'BuPu',
  seed: Math.seedrandom('added entropy', {
    entropy: true
  })
});

var blues = Trianglify({
  cell_size: 60,
  variance: 0.74,
  width: window.innerWidth,
  height: window.innerHeight,
  x_colors: ['#4b6dbf', '#487cc8', '#448cd0', '#409ed7', '#3ab1de',
    '#38bee6', '#36caeb', '#33d3eb', '#31dae8'
  ],
  y_colors: 'Blues',
  seed: Math.seedrandom('added entropy', {
    entropy: true
  })
});

var blueGreen = Trianglify({
  cell_size: 60,
  variance: 0.74,
  width: window.innerWidth,
  height: window.innerHeight,
  x_colors: ['#32dce3', '#3be0d7', '#4ae3cd', '#5de7c5', '#73ebc0',
    '#5ce39e', '#48dc82', '#39d66b', '#32d158'
  ],
  y_colors: 'GnBu',
  seed: Math.seedrandom('added entropy', {
    entropy: true
  })
});

var greenYellow = Trianglify({
  cell_size: 60,
  variance: 0.74,
  width: window.innerWidth,
  height: window.innerHeight,
  x_colors: ['#37cc43', '#66d13a', '#85d636', '#a1da35', '#b9df35',
    '#d1e435', '#e2e934', '#eff033', '#faf732'
  ],
  y_colors: 'YlGn',
  seed: Math.seedrandom('added entropy', {
    entropy: true
  })
});

var yellowOrange = Trianglify({
  cell_size: 60,
  variance: 0.74,
  width: window.innerWidth,
  height: window.innerHeight,
  x_colors: ['#fffa33', '#ffec33', '#ffdf33', '#ffd333', '#ffc733',
    '#feb433', '#fca032', '#fa8a32', '#f77231'
  ],
  y_colors: 'YlOrRd',
  seed: Math.seedrandom('added entropy', {
    entropy: true
  })
});

var orangeRed = Trianglify({
  cell_size: 60,
  variance: 0.74,
  width: window.innerWidth,
  height: window.innerHeight,
  x_colors: ['#f77231', '#f16832', '#ea6033', '#e35733', '#da4e33',
    '#d04833', '#c64233', '#bd3c34', '#b23734'
  ],
  y_colors: 'Reds',
  seed: Math.seedrandom('added entropy', {
    entropy: true
  })
});

//renders trianglify pattern/image to canvas based on the user's current temp range//
function backgroundImage(data) {

  if ($tempF <= 30 || $tempC <= -1.11) {
    lightPurple.canvas(document.getElementById('canvas1'))

  } else if ($tempF >= 31 && $tempF <= 40 || $tempC >= -1.12 && $tempC <= 4.44) {
    midPurple.canvas(document.getElementById('canvas1'))

  } else if ($tempF >= 41 && $tempF <= 50 || $tempC >= 4.45 && $tempC <= 10) {
    darkPurple.canvas(document.getElementById('canvas1'))

  } else if ($tempF >= 51 && $tempF <= 64 || $tempC >= 10.01 && $tempC <= 17.77) {
    blues.canvas(document.getElementById('canvas1'))

  } else if ($tempF >= 65 && $tempF <= 70 || $tempC >= 17.78 && $tempC <= 21.11) {
    blueGreen.canvas(document.getElementById('canvas1'))

  } else if ($tempF >= 71 && $tempF <= 84 || $tempC >= 21.12 && $tempC <= 28.88) {
    greenYellow.canvas(document.getElementById('canvas1'))

  } else if ($tempF >= 85 && $tempF <= 94 || $tempC >= 28.89 && $tempC <= 34.44) {
    yellowOrange.canvas(document.getElementById('canvas1'))

  } else if ($tempF >= 95 || $tempC >= 34.45) {
    orangeRed.canvas(document.getElementById('canvas1'))

  } else {
    defaults.canvas(document.getElementById('canvas1'))
  };
}

//using the OWM api data to get the correct icon to display, creating a new class and adding it to the DOM//
function setIcon(data) {
  $dayNightIcon = data.weather[0].icon;
  $icon = data.weather[0].id;

  //determine based on data whether night/day and display relevant icon//
  if ($dayNightIcon.match(/[d]/i)) {
    $('#day-or-night').html($('<i>', {
      class: 'wi wi-owm-day-' + $icon
    }));

  } else if ($dayNightIcon.match(/[n]/i)) {
    $('#day-or-night').html($('<i>', {
      class: 'wi wi-owm-night-' + $icon
    }));
  }
}

//draws the text (user's current temp) into a circle element, with °f visible until click event//
function $displayTempF(data) {
  $('#circle').html('');
  $('#circle').html('<canvas id="circle1" height="150" width="150"></canvas>');

  $('#circle1').drawText({
      layer: true,
      name: 'tempF',
      fillStyle: '#ffffff',
      strokeWidth: 1,
      x: 75,
      y: 75,
      fontSize: '3.6rem',
      fontFamily: 'Droid Sans Mono',
      text: $tempF + '°f'
    })
    //circle drawn/displayed based on size of containing text//
    .drawArc({
      layer: true,
      strokeStyle: '#ffffff',
      strokeWidth: 4,
      x: 75,
      y: 75,
      radius: $('#circle1').measureText("tempF").width / 1.25,
      click: function (data) {
        $displayTempC($temp);
      }
    })
}

//draws text based on (user's current temp) into a circle element, hidden until click event is triggered//
function $displayTempC($temp) {
  $('#circle').html('');
  $('#circle').html('<canvas id="circle2" height="150" width="150"></canvas>');
  $('#circle2').drawText({
      layer: true,
      name: 'tempC',
      fillStyle: '#ffffff',
      strokeWidth: 1,
      x: 75,
      y: 75,
      fontSize: '3.6rem',
      fontFamily: 'Droid Sans Mono',
      text: $temp + '°c'
    })
    //circle drawn/displayed based on size of containing text//
    .drawArc({
      layer: true,
      strokeStyle: '#ffffff',
      strokeWidth: 4,
      x: 75,
      y: 75,
      radius: $('#circle2').measureText("tempC").width / 1.25,
      click: function (data) {
        $displayTempF(data);
      }
    })
}
