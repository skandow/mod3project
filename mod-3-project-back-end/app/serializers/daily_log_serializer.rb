class DailyLogSerializer
    include FastJsonapi::ObjectSerializer
    attributes :status, :created_at, :events
end 