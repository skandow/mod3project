class EventSerializer
    include FastJsonapi::ObjectSerializer
    attributes :content, :emotion
end 