import react, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { actions } from './Redux/Actions';


const useStyles = makeStyles((theme) => ({
  Dis:{
    marginRight:"20vh",
    flexDirection:Row,  
 },
}));

function mapStateToProps(state) {
  return {
    listFavorite: state.dataReducer.listFavorite,
    currentLocation: state.dataReducer.currentLocation,
    currentKey: state.dataReducer.currentKey,
    currentCity: state.dataReducer.currentCity,
    listLocations: state.dataReducer.listLocations,
    defaultLocation: state.dataReducer.defaultLocation,
    days: state.dataReducer.days,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setListFavorite: (place) => dispatch(actions.setListFavorite(place)),
  setCurrentLocation: (place) => dispatch(actions.setCurrentLocation(place)),
  setCurrentKey: (place) => dispatch(actions.setCurrentKey(place)),
  setCurrentCity: (city) => dispatch(actions.setCurrentCity(city)),
  setListLocations: (place) => dispatch(actions.setListLocations(place)),
  setDays: (day) => dispatch(actions.setDays(day)),
  getWeather: () => dispatch(actions.getWeather()),
  setDefaultLocation: (place) => dispatch(actions.setDefaultLocation(place)),
  getDefault: () => dispatch(actions.getDefault()),
  getLocations: () => dispatch(actions.getLocations()),
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function Auto(props) {
  let { listFavorite, currentLocation, currentKey, currentCity, days,
    setListFavorite, setCurrentLocation, setCurrentKey, setCurrentCity, setDays, getWeather } = props;

  const API_KEY = "nLEZKQOCAMj3KrW5aAA9G54ENCTEjN2r‏";
  const classes = useStyles();
  const [res2, setRes] = useState([{
    Version: '',
    Key: "",
    Type: "",
    Rank: '',
    LocalizedName: "",
    Country: {
      ID: "",
      LocalizedName: ""
    },
    AdministrativeArea:
    {
      ID: "",
      LocalizedName: ""
    }
  }]);

  useEffect(function () {
    debugger;
    if (currentCity != undefined && currentCity != "")
      AutoCom();
  }, [currentCity])

  useEffect( ()=> {
    debugger;
    if (currentKey != undefined && currentKey != "") {
      Weather();
      Days();
    }
    else
      setCurrentCity("");
  }, [currentKey])


//the function of Autocomplete
  function AutoCom() {
    debugger;
    fetch("https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=" + API_KEY + "&q=" + currentCity + "", {
    }).then(res => res.json())
      .then((res) => {
        debugger;
        var arr = res;
        var cloneArray = [...res2];
        cloneArray = cloneArray.concat(arr);
        setRes(cloneArray);
      },
        (err) => {
          debugger;
        });
  }

  //the weather of current time
  function Weather() {
    debugger;
    fetch("https://dataservice.accuweather.com/currentconditions/v1/" + currentKey + "?apikey=" + API_KEY + "&details=false", {
    }).then(res => res.json())
      .then((res) => {
        debugger;
        setCurrentLocation(res);
      },
        (err) => {
          debugger;
        });
  }

  //the wather of 5 days
  function Days() {
    debugger;
    fetch("https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + currentKey + "?apikey=" + API_KEY + "&details=false", {
    }).then(res => res.json())
      .then((res) => {
        debugger;
        setDays(res);
      },
        (err) => {
          debugger;
        });
  }

  function hundleCity(e) {
    setCurrentCity(e.target.value);
    debugger;
  }

  function hundleWeather(e) {
    debugger;
    setCurrentCity(e.target.value);
    for (var i = 0; i < res2.length; i++)
      if (res2[i].LocalizedName == e.target.value)
        setCurrentKey(res2[i].Key);
  }
  function hundleFavor() {
    setListFavorite({ key: currentKey, city: currentCity, currentLocation: currentLocation });
  }
  function Substrings(str)
  {
    return str.substring(0,10);
  }
  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        options={res2}
        getOptionLabel={(option) => option.LocalizedName}
        style={{ marginLeft: '70vh', marginTop: '20vh', width: '50ch' }}
        onSelect={(e) => hundleWeather(e)}
        renderInput={(params) =>
          <TextField {...params} label="הקלד עיר" id={res2.Key} variant="outlined" onChange={(e) => hundleCity(e)} />}
      />
     <div style={{border:"solid" ,width:"50%", marginLeft:"25%", marginTop:"5%", height:"50vh"}}>
          <div style={{ marginTop: '5vh', width: '15vw' ,marginLeft:"70%"}}>
            <FavoriteBorderIcon style={{ width: '7vh' }} />
            <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={hundleFavor}>Favorite</Button>
          </div>
          {currentLocation[0] &&
            <div style={{ width: "20%", height: "20%", marginBottom: "15%",marginLeft:"5%" }} className={classes.Dis}>
              <Card className={classes.Card} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2">
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                { currentCity?<label>{currentCity}</label>:null} <br></br>
                    {currentLocation[0].Temperature.Metric.Value}℃  <br></br>
                     {currentLocation[0].WeatherText}
                  </Typography>
                  <Typography variant="body2" component="p">
                  </Typography>
                </CardContent>
              </Card></div>
          }

      {days.DailyForecasts  ?
        <> 
          <div >{days.DailyForecasts.map((day) => {
            return (
             <div style={{display:"inline-block", width:"15%",marginLeft:"1%",marginRight:"1%",marginTop:"1%",marginBottom:"1%"}}>
                    <Card className={classes.Card} variant="outlined">
                      <CardContent>
                        <Typography variant="h5" component="h2">
                        </Typography>
                        <Typography color="textSecondary">
                          <label>{day.Temperature.Minimum.Value} ℉</label> <br></br>
                          {Substrings(day.Date)}
                        </Typography>
                        <Typography variant="body2" component="p">
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
            )
          })}
          </div>
         
        </> : null}
        </div>
    </div>
  );
}))