CREATE TABLE admins (
                        id BIGSERIAL PRIMARY KEY,
                        username VARCHAR(100) NOT NULL UNIQUE,
                        password_hash VARCHAR(255) NOT NULL,
                        role VARCHAR(50) NOT NULL DEFAULT 'ADMIN',
                        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
                          id BIGSERIAL PRIMARY KEY,
                          title VARCHAR(200) NOT NULL,
                          slug VARCHAR(200) NOT NULL UNIQUE,
                          short_description VARCHAR(500),
                          full_description TEXT,
                          github_url VARCHAR(500),
                          live_url VARCHAR(500),
                          featured BOOLEAN NOT NULL DEFAULT FALSE,
                          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE project_technologies (
                                      project_id BIGINT NOT NULL,
                                      technology VARCHAR(100) NOT NULL,

                                      CONSTRAINT fk_project_technologies_project
                                          FOREIGN KEY (project_id)
                                              REFERENCES projects (id)
                                              ON DELETE CASCADE
);

CREATE TABLE project_files (
                               id BIGSERIAL PRIMARY KEY,
                               project_id BIGINT NOT NULL,
                               file_name VARCHAR(255) NOT NULL,
                               content_type VARCHAR(150) NOT NULL,
                               file_size BIGINT NOT NULL,
                               file_data BYTEA NOT NULL,
                               file_type VARCHAR(50) NOT NULL,
                               created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                               CONSTRAINT fk_project_files_project
                                   FOREIGN KEY (project_id)
                                       REFERENCES projects (id)
                                       ON DELETE CASCADE
);