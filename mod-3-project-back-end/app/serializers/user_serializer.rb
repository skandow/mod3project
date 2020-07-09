class UserSerializer
    include FastJsonapi::ObjectSerializer
    attributes :username, :logged_in
    has_many :daily_logs
end 