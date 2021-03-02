import Action from './action'


export default function reducer(state={},action){
    switch(action.type){
        case Action.LOG_IN :{
            const {user_id,username,token,password}=action.payload
            const blogger_details={
                user_id:user_id,
                username:username,
                blogger_token:token,
                authenticationDetails:password

            }
            localStorage.setItem('user_id',blogger_details.user_id);
            localStorage.setItem('username',blogger_details.username);
            localStorage.setItem('blogger_token',blogger_details.blogger_token);
            localStorage.setItem('password',blogger_details.password);
            return blogger_details

        }

    

        case Action.BLOGGERS_DATA:{
            return{
                ...state, blog_Items:action.payload
            }
        }

       
        case Action.LOG_OUT :{
            localStorage.clear();
            return {user_id:null,bearer_token:null,username:null};
        }


     default:
        return state;
        
    }
}