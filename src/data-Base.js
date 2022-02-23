
class Users{
    user = {
        id: "",
        name: "",
        pasvord: "",
    };

    user_data_base = [
        id_user_base = 0,
        {},
    ];

    //провероки
    isUserDataBase( new_user ){ 
        if( JSON.stringify( new_user ) != JSON.stringify( this.user )){
            return false;
        }
        if( typeof ( new_user ) != this.user)
            return false;

        for( const key in this.user_data_base ) {
           if( this.user_data_base[ key.name ] == new_user.name )
                this.user_data_base[0] = key;
                return false;
        }
        return true;
    }

    Push( new_user ){ 
        // в теории id  будет текущая дата в милисикундах типа уникальная
        new_user.id = new Date().getTime();
        this.user_data_base.push( new_user );
    }

}

var baseUser = new Users()

export default baseUser

