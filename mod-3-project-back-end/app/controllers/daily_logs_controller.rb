class DailyLogsController < ApplicationController
    def index 
        daily_logs = DailyLog.all 
        render json: DailyLogSerializer.new(daily_logs)
    end

    def create 
        daily_log = DailyLog.create(status: "current")
        render json: DailyLogSerializer.new(daily_log)
    end 

    def update 
        daily_log = DailyLog.find(params[:id])
        daily_log.update(status: "complete")
        render json: DailyLogSerializer.new(daily_log)
    end 
end
