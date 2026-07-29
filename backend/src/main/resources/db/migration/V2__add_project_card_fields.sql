ALTER TABLE projects
    ADD COLUMN image_url VARCHAR(500),
    ADD COLUMN download_url VARCHAR(500);

CREATE TABLE project_screenshots (
    project_id BIGINT NOT NULL,
    display_order INTEGER NOT NULL,
    screenshot_url VARCHAR(500) NOT NULL,

    CONSTRAINT pk_project_screenshots
        PRIMARY KEY (project_id, display_order),

    CONSTRAINT fk_project_screenshots_project
        FOREIGN KEY (project_id)
            REFERENCES projects (id)
            ON DELETE CASCADE
);
