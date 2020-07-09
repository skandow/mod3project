class UsersController < ApplicationController

    def search 
        if params[:username]
            user = User.find_by(username: params[:username])
        elsif params[:logged_in]
            user = User.find_by(logged_in: true)
        end
        if !user 
            render json: "No user logged in"
        else 
            redirect_to user_path(user)
        end 
    end 

    def show
        user = User.find(params[:id])
        user.update(logged_in: true) 
        options = {include: [:daily_logs]}
        render json: UserSerializer.new(user, options)
    end

    def update
        user = User.find(params[:id])
        p "******************************"
        p params
        user.update(logged_in: false)
        render json: UserSerializer.new(user)
    end 

end
