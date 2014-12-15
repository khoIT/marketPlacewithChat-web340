class Mailform < MailForm::Base
  attribute :name,      :validate => true
  attribute :email,     :validate => /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i
  attribute :id
  attribute :message

  attribute :file,      :attachment => true
  attribute :nickname,  :captcha  => true

  # Declare the e-mail headers. It accepts anything the mail method
  # in ActionMailer accepts.
  def headers
    {
      :subject => "My Contact Form",
      :to => "khoitran_2014@depauw.edu",
      :from => %("#{name}" <#{email}>)
    }
  end
end
