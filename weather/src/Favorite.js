import React from 'react'
import { connect } from 'react-redux'
import { actions } from './Redux/Actions';
import  {withRouter} from "react-router-dom";


function mapStateToProps(state) {
    return {
        listFavorite: state.dataReducer.listFavorite,
        currentLocation: state.dataReducer.currentLocation,
        currentKey: state.dataReducer.currentKey,
        currentCity: state.dataReducer.currentCity,
    }
}

const mapDispatchToProps = (dispatch) => ({
    setListFavorite: (place) => dispatch(actions.setListFavorite(place)),
    setCurrentLocation: (city) => dispatch(actions.setCurrentLocation(city)),
    setCurrentKey: (key) => dispatch(actions.setCurrentKey(key)),
    setCurrentCity: (city) => dispatch(actions.setCurrentCity(city)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function Favorite(props) {
    debugger
    let { listFavorite,setCurrentKey,setCurrentCity} = props;

    function currentWeather(e){
        debugger;
        setCurrentCity(e.city);
        setCurrentKey(e.key);
        props.history.push("/AutoCoCities");
    }
    return (
        <>
        <div style={{marginLeft:"30%", border:"solid", width:"50%",marginTop:"10%",height:"40vh"}}>
        <h1 style={{ marginLeft:"40%"}}>my favorite</h1>
         {listFavorite!= undefined &&
                    <>
                        <div>{listFavorite.map((item) => {
                            return (
                                <>
                                    <div style={{display:"inline-block", marginLeft:"40%" ,border:"solid", width:"20%", marginTop:"5%"}} value={item} onClick={() => currentWeather(item)}>
                                       <div>{item.city}</div> 
                                       {item.currentLocation[0] && <p>{item.currentLocation[0].WeatherText}</p>}
                                    </div>

                                </>
                            )
                        })}</div>
                    </>
                }
                </div>
        </>
    )
}))