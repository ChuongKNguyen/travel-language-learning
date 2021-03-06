class User < ApplicationRecord
  has_one :profile

  has_many :userlangs
  has_many :messages
  has_many :conversations, foreign_key: :sender_id

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable

  def age(dob)
    now = Time.now.utc.to_date
    now.year - dob.year - ((now.month > dob.month || (now.month == dob.month && now.day >= dob.day)) ? 0 : 1)
  end

  def full_name
    first_name && last_name ? "#{first_name} #{last_name}" : "Anonymous"
  end

  def conversing_users
    sender_conversations = Conversation.where(sender_id: self.id)
    sender_users = User.find(sender_conversations.map(&:recipient_id))

    recipient_conversations = Conversation.where(recipient_id: self.id)
    recipient_users = User.find(recipient_conversations.map(&:sender_id))

    sender_users + recipient_users
  end

  def arent_conversing(user)
    sender_conversation = Conversation.where(sender_id: self.id, recipient_id: user.id)

    recipient_conversation = Conversation.where(sender_id: user.id, recipient_id: self.id)

    if sender_conversation.length > 0 || recipient_conversation.length > 0
      false
    else
      true
    end
  end

  def languages_studying
    user_languages = Userlang.where(user_id: self.id)

    languages = Language.find(user_languages.map(&:language_id))

    if languages.length == 0
      "None"
    else
      [].tap do |studying|
        languages.each do |language|
          studying.push(language.name)
        end
      end
    end

  end

  def self.suggested_users(user)
    user_languages = Userlang.where(user_id: user.id)

    same_userlangs = Userlang.where(language_id: user_languages.map(&:language_id))

    users = User.find(same_userlangs.map(&:user_id) - user.conversing_users.map(&:id))
  end

  def nearby_users
    origin = self.origin.split(" ")
    origin = origin.pop()

    formatted_origin = '%' + origin + '%'

    same_location = User.where('origin LIKE ?', formatted_origin ).all
  end
end
