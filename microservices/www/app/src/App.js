import React, { Component } from 'react';
import Input from './components/input';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography';

const styles=theme=>({
  grid1: {
    flexBasis: "10%",
    overflow: 'auto',
    //backgroundColor: 'white'
    //padding: '20px 20px 0px 0px',
    //border:"1px solid red"
  },
  grid2: {
    flexBasis: "90%",
    marginLeft: "20px",
    //border:"1px solid red"
  },
  grid3: {
    width: '100%',
    height: '100%'
  },
  grid4: {

  },
  container: {
   height: '660px',
   width: '850px',
   margin: '0 auto',
   border: '1px solid grey',
   borderRadius: '20px',
   background: '#38394D',
   //background: "url('images/neon.jpeg')",
   //backgroundSize: 'cover',
   //backgroundReapeat: 'no-repeat'
    //filter: 'opacity(90%)'
   paddingRight: "15px"
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      entityType: [],
      entityValue: [],
      input: ''
    }
    this.handleSubmit=this.handleSubmit.bind(this);
  }


  handleSubmit(e) {

 
  var headers = new Headers();
// Tell the server we want JSON back
  headers.set('Accept', 'application/json');

// 1.2 Form Data
// We need to properly format the submitted fields.
// Here we will use the same format the browser submits POST forms.
// You could use a different format, depending on your server, such
// as JSON or XML.
var formData = new FormData();
var value= e.target.value;  
formData.append("input",value);
var url = 'https://app.fridge28.hasura-app.io/';
var fetchOptions = {
  method: 'POST',
  headers,
  body: formData
};
var responsePromise = fetch(url, fetchOptions);

responsePromise
  // 3.1 Convert the response into JSON-JS object.
  .then(function(response) {
    return response.json();
  })
  // 3.2 Do something with the JSON data
  .then( (array)=> {
    let temp_value= [];
    let temp_type = [];
    array.map((item) => {
      temp_type=temp_type.concat(item.entityType);
      temp_value=temp_value.concat(item.entityValue);
    })
   
    this.setState({
      entityType: temp_type,
      entityValue: temp_value,
      input: value
    })
    console.log(this.state.entityType);
  });
}
  render() {
    const {classes} =this.props
    return (
       <Grid container className={classes.container} direction='column' justify='space-between'>
       <Grid item xs={12} style={{padding: '20px 0px 0px 20px'}} className={classes.grid1}>
          <Input onSubmit={this.handleSubmit}/>
       </Grid>
       <Grid item xs={12} className={classes.grid2} >
         <Typography style={{color: 'white'}} type= "title">{this.state.input}</Typography>
         <Typography style={{color: 'white'}} type ="headline">Entity type:</Typography>
         <ul>{this.state.entityType.map((item, index)=><li style={{color: 'red'}}key={index}>{item}</li>)}</ul>
         <Typography style={{color: 'white'}} type ="headline">Entity Value: </Typography>
         <ul>{this.state.entityValue.map((item, index)=><li style={{color: 'red'}} key={index}>{item}</li>)}</ul>
       </Grid>
    </Grid>
    );
  }
}

export default withStyles(styles)(App);
