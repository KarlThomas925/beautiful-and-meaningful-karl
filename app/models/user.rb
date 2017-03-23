class User < ActiveRecord::Base
  # Remember to create a migration!

  include BCrypt

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true
  validates :email, uniqueness: true

  # e.g., --- user.authenticate(params[:password])
  def authenticate(arg_password)
    self.password == arg_password
  end

  def password
    @password ||= Password.new(hashed_password)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.hashed_password = @password
  end
end
