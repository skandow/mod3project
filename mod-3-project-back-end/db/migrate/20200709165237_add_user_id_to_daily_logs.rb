class AddUserIdToDailyLogs < ActiveRecord::Migration[6.0]
  def change
    add_column :daily_logs, :user_id, :integer
  end
end
