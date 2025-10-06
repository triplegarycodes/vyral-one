insert into users (username, email, avatar_url, points)
values ('gary', 'gary@example.com', 'https://i.pravatar.cc/150?img=1', 600)
on conflict (email) do nothing;

insert into challenges (title, description, xp_reward) values
  ('7-Day Focus Streak', 'Stay focused every day for a week.', 100),
  ('Daily Run', 'Track your run each morning.', 200)
on conflict (title) do nothing;

insert into tasks (user_id, title, status)
select id, 'Finish first VybeTree goal', 'todo'
from users
where username = 'gary';
