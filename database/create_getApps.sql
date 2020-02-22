CREATE DEFINER=`livesandbox`@`localhost` PROCEDURE `livesandbox`.`getApps`( IN userID INT, IN rowcount INT, IN rowoffset INT )
BEGIN
	SELECT a.appID, a.userID, a.jsCode, a.htmlCode, a.cssCode, a.esModule, a.name
    FROM  apps a
    WHERE userID = userID
    LIMIT rowcount OFFSET rowoffset;

	SELECT count(*) as totalCount
    FROM  apps
    WHERE userID = userID;
END
