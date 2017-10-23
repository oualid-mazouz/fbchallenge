/*
 *
 */

import React from 'react';
import {Navbar,Preloader,Button} from 'react-materialize';
import {connect} from 'react-redux';
import {makeSelectCredentials,makeSelectDetails} from './selectors';
import { createStructuredSelector } from 'reselect';
import {login,logout} from "./actions";
import '../../styles/homepage/index.css';
import Gallery from 'react-grid-gallery';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.saveImageAs = this.saveImageAs.bind(this);
    this.onImageSelect = this.onImageSelect.bind(this);

    this.state = {userImg:new Array(),refresh:false};

  }



   saveImageAs (event) {
     console.log(event.target.src)
     var link = document.createElement('a');
     link.href = event.target.src;
     link.download = 'Download.jpg';
     //document.body.appendChild(link);
     //link.click();

     var image = document.createElement('img');
     image.src = event.target.src;

     link.appendChild(image);
     link.click();


  }



  onImageSelect(index, image){
      console.log(index,image)
  }


  componentDidUpdate(){

    // Persisting the images in localStorage so that when user refresh page state will get already fetched data .
    localStorage.setItem('pers',JSON.stringify(this.state.userImg));



  }

  loginUser(event){
    event.preventDefault();
    let self = this;
    var allPhotos = [];
    var accessToken = '';
    this.setState({refresh:true});
    FB.login(response => {
      localStorage.setItem('pers','[]');
      if (response && response.authResponse) {
        let { userID, accessToken } = response.authResponse;
        let payload = { id: userID, token: accessToken };
        self.props.login(payload);
        localStorage.setItem('connectionStatus',response.status);

        FB.api('/me/albums?fields=id,name', function(response2) {
          console.log(response2);
         // for (var i=0; i<response2.data.length; i++) {

            var album = response2.data[0]; //display only one album if exists
            if (album.id !== undefined){

              FB.api('/'+album.id+'/photos?fields=picture&access_token='+accessToken, function(photos){
                console.log(photos);
                if (photos && photos.data && photos.data.length){
                  for (var j=0; j<photos.data.length; j++){
                    var photo = photos.data[j];

                    // photo.picture contain the link to picture
                    var link = document.createElement('a');
                    link.href = photo.picture;
                    link.download = 'Download.jpg';
                    //document.body.appendChild(link);
                    //link.click();

                    var image = document.createElement('img');
                    image.src = photo.picture;
                    console.log(photo.picture);
                    link.appendChild(image);

                    let galleryItem = {
                      src: photo.picture,
                      thumbnail: photo.picture,
                      thumbnailWidth: 320,
                      thumbnailHeight: 212,
                      isSelected: false,
                      caption: "Click on the image to download it"
                    };

                    self.setState({userImg:self.state.userImg.concat(galleryItem)});

                  }
                }
              });
           }
        });

      }
    },{scope: 'user_photos,publish_actions'});

  }



  logoutUser(event){
    event.preventDefault();
    let self = this;
    this.setState({userImg:[],refresh:false});
    FB.getLoginStatus(function(response) {

      if (response.authResponse) {
        FB.logout(function(response) {
          localStorage.setItem('connectionStatus',response.status);
          self.props.logout();
        });
      }else {

        self.props.logout();
      }
    });
  }

  componentWillMount(){
      if(localStorage.getItem('connectionStatus')==='connected'){
        this.setState({userImg:JSON.parse(localStorage.getItem('pers'))});
      }
  }


  render() {

    const {credentials} = this.props;
    console.log('render called');
    console.log();
    return (
      <div>

          <div className="valign-wrapper" style={{marginTop:10,marginBottom:20}}>
            <div className="valign center-block">

              {
                (localStorage.getItem('connectionStatus') === "connected") ?
                    ( <Button waves='light' onClick={this.logoutUser}>Logout</Button>) :
                    (this.state.refresh ? <Preloader  size='small'/> :<Button waves='light' onClick={this.loginUser}>Login</Button>)
              }


            </div>

          </div>

        {

          <Gallery images={this.state.userImg} backdropClosesModal={true}  onClickImage={this.saveImageAs}/>

        }

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  credentials : makeSelectCredentials(),
  details:makeSelectDetails(),

});

export default connect(mapStateToProps,{login,logout})(HomePage);
