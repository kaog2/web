CREATE TABLE users (
	firstname varchar(100) NOT NULL,
	lastname varchar(100) NOT NULL,
	username varchar(100) NOT NULL,
    PRIMARY KEY(username),
	nick varchar(100) NOT NULL,
	pass     varchar(400) NOT NULL,
	email varchar(100) NOT NULL,
  	birthdate varchar(100),
	nationality varchar(100),
	permission int NOT NULL
);

CREATE TABLE blog ( 
	blog_id INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (blog_id),
	username varchar(100) NOT NULL, 
	FOREIGN KEY (username) REFERENCES users(username) 
);

CREATE TABLE post (
	post_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (post_id),
    blog_id INT NOT NULL,
    FOREIGN KEY (blog_id) REFERENCES blog(blog_id),
	title varchar(100) NOT NULL,
	body varchar(1000) NOT NULL,
	photo LONGBLOB, 
	post_date varchar(100) NOT NULL,
	username varchar(100) NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username)
);

CREATE TABLE comments (
	comment_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (comment_id),
	body varchar(1000) NOT NULL,
	com_date varchar(100),
	post_id INT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES post(post_id),
	username varchar(100) NOT NULL,
    FOREIGN KEY (username) REFERENCES users(username)
);