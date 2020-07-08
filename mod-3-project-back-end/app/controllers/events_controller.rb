class EventsController < ApplicationController
    def index
        events = Event.all
        render json: EventSerializer.new(events)
    end

    def create
        new_event = Event.create(content: params[:content], emotion: params[:emotion], daily_log_id: params[:daily_log_id])
        render json: EventSerializer.new(new_event)
    end

    def update
        event = Event.find(params[:id])
        event.update(content: params[:content], emotion: params[:emotion])
        render json: EventSerializer.new(event)
    end

    def destroy
        event = Event.find(params[:id])
        event.delete

        render json: EventSerializer.new(event)
    end
end
