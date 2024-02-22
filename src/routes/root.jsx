import LandingContainer from "../components/LandingContainer";
import NavBar from "../components/shared/NavBar";

export default function Root() {
    const DEFAULT_INTERACTABLES = [
      {type:"link", url:"/login", name:"Login"},
      {type:"link", url:"/register", name:"Sign up"},
    ]
    async function devCheck(){
    }

    return (
      <div style={{height:"100%"}}>
        <NavBar interactables={DEFAULT_INTERACTABLES} />
        <LandingContainer />
      </div>
    );
  }