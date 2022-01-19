
import axios from "axios"

import ChangeTranslation from "./ChangeTranslation"

import config from "../config.json"

const Nav = () => {
    
    function logout () {
        axios.get(`${config.API_DOMAIN}/api/logout`)
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }
    
    return (
        <nav className="bg-gradient-to-tr from-blue-800 to-purple-700 text-white text-lg font-bold ">
            <ul className="flex gap-8 p-4 items-center ">
                <h1 className="text-2xl p-8 grow">Absence & Journal</h1>
                { getCookie("isAdmin") == "false" && 
                    <li>
                            <a href={`/user/${getCookie("id")}/absence`}>My Absence</a>
                    </li>
                }
                { getCookie("isAdmin") == "false" && 
                    <li>
                            <a href={`/user/${getCookie("id")}/journalweek`}>My Journal</a>
                    </li>
                }
                { getCookie("isAdmin") == "true" &&  
                    <li>
                        <a href="/">User</a>
                    </li>
                }
                { getCookie("isAdmin") == "true" && 
                    <li>
                        <a href="/absences">Absences</a>
                    </li>
                }
                { getCookie("isAdmin") == "true" && 
                    <li>
                        <a href="/journalweeks">Journals</a>
                    </li>
                }
                <li>
                    <a href="/" onClick={()=>{logout()}}>logout</a>
                </li>
                <ChangeTranslation />
            </ul>
        </nav>
    )
}

export default Nav
