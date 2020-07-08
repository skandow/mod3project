# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
DailyLog.delete_all
Event.delete_all
ActiveRecord::Base.connection.execute("DELETE from sqlite_sequence where name = 'daily_logs'")
ActiveRecord::Base.connection.execute("DELETE from sqlite_sequence where name = 'events'")

firstLog = DailyLog.create(status: "complete", title: "Tuesday, July 7, 2020")
secondLog = DailyLog.create(status: "current", title: "Wednesday, July 8, 2020")

event1 = Event.create(content: "We began seeding the data.", emotion: "joy", daily_log_id: 1)
event2 = Event.create(content: "There was a problem seeding the data.", emotion: "surprise", daily_log_id: 1)
event3 = Event.create(content: "We couldn't figure out what the problem was.", emotion: "fear", daily_log_id: 2)
event4 = Event.create(content: "We got frustrated with the problem.", emotion: "anger", daily_log_id: 2)
event5 = Event.create(content: "We cursed the problem.", emotion: "disgust", daily_log_id: 2)