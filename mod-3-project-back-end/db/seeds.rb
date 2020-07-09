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


dates_array = []
date = Date.today - 20
while date != Date.today
    dates_array << date.strftime("%A, %B %-d, %Y")
    date += 1 
end 
dates_array.each do |date|
    DailyLog.create(status: "complete", title: date)
end  


# firstLog = DailyLog.create(status: "complete", title: "Sunday, July 5, 2020")
# secondLog = DailyLog.create(status: "complete", title: "Monday, July 6, 2020")
# thirdLog = DailyLog.create(status: "complete", title: "Tuesday, July 7, 2020")

EVENTS = ["I almost got hit by a bicycle", "I went to the store", "My favorite team lost", "I saw a movie", "I visited with my parents", "I played some video games", "I wrote some code", "I ate at a restaurant"]
EMOTIONS = ["joy", "sadness", "anger", "disgust", "fear", "surprise"]

100.times do 
    Event.create(content: EVENTS.sample, emotion: EMOTIONS.sample, daily_log_id: DailyLog.all.sample.id)
end
# event1 = Event.create(content: "We began seeding the data.", emotion: "joy", daily_log_id: 1)
# event2 = Event.create(content: "There was a problem seeding the data.", emotion: "surprise", daily_log_id: 1)
# event3 = Event.create(content: "We couldn't figure out what the problem was.", emotion: "fear", daily_log_id: 2)
# event4 = Event.create(content: "We got frustrated with the problem.", emotion: "anger", daily_log_id: 2)
# event5 = Event.create(content: "We cursed the problem.", emotion: "disgust", daily_log_id: 2)
# event6 = Event.create(content: "We didn't know what was happening...", emotion: "surprise", daily_log_id: 3)
# event7 = Event.create(content: "We were able to filter the logs.", emotion: "joy", daily_log_id: 3)