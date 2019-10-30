import React, {Component} from 'react';

class ComponentsProps extends Component{
  render(){

      /** 
    function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
      }
      */

    const element = <Welcome name="Sara" />

    function Multiple(){
        return (
            <div>
                <Welcome name="Sara"/>
                <Welcome name="Cahal"/>
                <Welcome name="Edite"/>
            </div>
        );
    }

    function Comment(props){
        return(
            <div className="Comment">
                <UserInfo user={props.author}/>
                <div className="Comment-text">{props.text}</div>
                <div className="Comment-date">{formatDate(props.date)}</div>
            </div>
        );
    }

    function Avatar(props) {
        return(
            <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
        );
    }

    function UserInfo(props){
        return(
            <div className="UserInfo">
                <Avatar user={props.user} />
                <div className="UserInfo-name">{props.user.name}</div>
            </div>
        );
    }
      
    return(
      <div>
        {/**<Welcome/>*/}
        {/**<element>{element}</element>*/}
        <Multiple>{Multiple}</Multiple>
      </div>
    );
  }
}

class Welcome extends React.Component{
    render(){
        return <h1>Hello, {this.props.name}</h1>;
    }
}

export default ComponentsProps;
