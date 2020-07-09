class UsersController < ApplicationController

    def search 
        user = User.find_by(username: params[:username])
        p user
        redirect_to user_path(user)
    end 

    def show
        user = User.find(params[:id])
        user.update(logged_in: true) 
        options = {include: [:daily_logs]}
        render json: UserSerializer.new(user, options)
    end

end
