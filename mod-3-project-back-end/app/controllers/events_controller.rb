class EventsController < ApplicationController
    def create 
        new_event = Event.create(content: params[:content], emotion: params[:emotion])
        render json: EventSerializer.new(new_event)
    end 
end
