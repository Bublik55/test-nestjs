CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL
);

CREATE TABLE `columns` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `author_id` int
);

CREATE TABLE `cards` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `column_id` int NOT NULL,
  `author_id` int NOT NULL,
  `content` varchar(255) NOT NULL
);

CREATE TABLE `comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `card_id` int NOT NULL,
  `author_id` int NOT NULL,
  `content` varchar(255) NOT NULL
);

ALTER TABLE `columns` ADD FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

ALTER TABLE `cards` ADD FOREIGN KEY (`author_id`) REFERENCES `users` (`id`);

ALTER TABLE `cards` ADD FOREIGN KEY (`column_id`) REFERENCES `columns` (`id`) ON DELETE CASCADE;

ALTER TABLE `comments` ADD FOREIGN KEY (`author_id`) REFERENCES `users` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`) ON DELETE CASCADE;

CREATE INDEX `users_index_0` ON `users` (`id`);

CREATE INDEX `users_index_1` ON `users` (`username`);

CREATE INDEX `columns_index_2` ON `columns` (`id`);

CREATE INDEX `cards_index_3` ON `cards` (`id`);

CREATE INDEX `comments_index_4` ON `comments` (`id`);
