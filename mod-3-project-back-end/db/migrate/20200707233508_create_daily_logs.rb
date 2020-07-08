class CreateDailyLogs < ActiveRecord::Migration[6.0]
  def change
    create_table :daily_logs do |t|
      t.string :status

      t.timestamps
    end
  end
end
