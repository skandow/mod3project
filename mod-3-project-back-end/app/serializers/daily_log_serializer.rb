class DailyLogSerializer
    include FastJsonapi::ObjectSerializer
    attributes :status, :title, :events
end 