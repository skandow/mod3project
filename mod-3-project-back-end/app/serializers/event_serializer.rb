class EventSerializer
    include FastJsonapi::ObjectSerializer
    attributes :content, :emotion
    belongs_to :daily_log
end 