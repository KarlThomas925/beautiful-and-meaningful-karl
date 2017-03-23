before '/users/new' do
  redirect "/" if logged_in?
end

get '/users/new' do
 erb :'users/new'
end

post '/users' do
  return redirect "/" if logged_in?
  user = User.new(params[:user])

  if user.save
    session[:user_id] = user.id
    redirect "/"
  else
    @errors = user.errors.full_messages
    erb :'users/new'
  end
end

get '/users/:user_id' do
  return redirect "/sessions/new" if !logged_in?
  if authorized?(params[:user_id])
    erb :'users/show'
  else
    redirect "users/#{current_user.id}"
  end
end
