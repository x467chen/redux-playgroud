import _ from 'lodash';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY ='AIzaSyBr3QOQfS8ej0KA7hHMNnkBCdKsR_AM_aU';



// const App = () => {
//   return (
//     <div>
//         <SearchBar />
//     </div>
//   );
// }
class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      videos:[],
      selectedvideo: null
    };
    this.videoSearch('J.Fla');
  }



  videoSearch(term){
    YTSearch({key: API_KEY,term:term},(videos)=>{
      console.log(videos);
      this.setState({
        videos: videos,
        selectedvideo: videos[0]
      });
      //this.setState({videos:videos});

    });

  }

  render(){
    const videoSearch = _.debounce((term)=>{this.videoSearch(term)},400);
    return (
      <div>
          <SearchBar onSearchTermChange = {videoSearch} />
          <VideoDetail video={this.state.selectedvideo} />
          <VideoList
            onVideoSelect = {selectedvideo => this.setState({selectedvideo})}
            videos={this.state.videos} />
      </div>
    );
  }
}
ReactDOM.render(<App />,document.querySelector('.container'))
