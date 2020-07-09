class User < ApplicationRecord
    has_many :daily_logs
    has_many :events, through: :daily_logs
end
