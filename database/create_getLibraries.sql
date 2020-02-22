CREATE DEFINER=`livesandbox`@`localhost` PROCEDURE `livesandbox`.`getLibraries`( IN userID INT, IN rowcount INT, IN rowoffset INT )
BEGIN
	SELECT *
    FROM  libraries
    WHERE userID = userID
    LIMIT rowcount OFFSET rowoffset;

	SELECT count(*) as totalCount
    FROM  libraries
    WHERE userID = userID;
END
