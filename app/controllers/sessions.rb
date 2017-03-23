#if they are logged in bring em somewhere, if not head on down to the login page.
get '/sessions/new' do
  return redirect "/" if logged_in?
  erb :'sessions/new' #/login
end

#From the login form, if the user exists and the auth return true, proceeeeeed. Logging them in and directing them to their secret page.
#If the login information doesn't check out, continue to show the login page.

post '/sessions' do
  user = User.find_by(email: params[:email])

  if user && user.authenticate(params[:password])
    session[:user_id] = user.id

    redirect "/"
  else
    @errors = ['Invalid username or password.']

    erb :'sessions/new' #/login
  end
end

#From the 'logout' button on the profile, reset sessions to 'nil' and send the user back to the login page.

delete '/sessions' do
  session[:user_id] = nil

  redirect '/sessions/new' #/login or home
end
