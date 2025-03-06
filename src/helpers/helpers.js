import {xml2json} from "xml-js";
import {noImageUrl} from "@/config/config.js";

const fetchData = async function(url, format = "json") {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        if (format === "xml") {
            return await response.text();
        }

        return await response.json();

    } catch (e) {
        throw e;
    }
}

const getBoardGamesCollection = async function(paginationOptions = null) {
    try {
        let collectionUrl = '/api/boardGames';
        if (paginationOptions) {
            collectionUrl += `?_page=${paginationOptions.page}&_per_page=${paginationOptions.per_page}`;
            console.log(collectionUrl)
        }

        return await fetchData(collectionUrl);

    } catch (e) {
        throw e;
    }
}

const getBoardGameInfo = async (id) => {
    try {
        const boardGameInfoUrl = `/api/boardGames/${id}/?_embed=loggedPlays`;

        return await fetchData(boardGameInfoUrl);

    } catch (e) {
        throw e;
    }
}

const getLoggedPlays = async () => {
    try {
        const loggedPlaysUrl = `/api/loggedPlays`;

        const allLoggedPlays = await fetchData(loggedPlaysUrl);

        return filterActiveLoggedPlays(allLoggedPlays);
    } catch (e) {
        throw e;
    }
}

const filterActiveLoggedPlays = (loggedPlays) => {
    return Object.values(loggedPlays).filter(loggedPlay => loggedPlay.boardGameId !== null)
}

const deleteBoardGameFromCollection = async (id) => {
    try {
        const deleteBoardGameUrl = `/api/boardGames/${id}/?_embed=loggedPlays`;

        const response = await fetch(deleteBoardGameUrl, {
            method: 'DELETE'
        });

        return response.json();
    } catch (e) {
        throw (e)
    }
}

const xmlToJson = function(xml) {
    try {
        const jsonString = xml2json(xml, { compact: true });

        return JSON.parse(jsonString);
    } catch (e) {
        throw e;
    }
}

const mapBoardGamesDetailData = function (boardGamesDetail, boardGamesSearchResults) {
    boardGamesDetail.map((boardGameData) => {
        const name = boardGameData.name.length ? boardGameData.name.find((name) => {
            return name._attributes.hasOwnProperty('primary')
        })._text : boardGameData.name._text;
        const bggId = boardGameData._attributes.objectid;
        boardGamesSearchResults.boardGames.push({
            'bggId': bggId,
            'name': name,
            'thumbnail': boardGameData.thumbnail ? boardGameData.thumbnail._text : noImageUrl,
            'publishYear': boardGameData.yearpublished._text,
        });
    });
}

const refreshSearchResults = function (boardGamesSearchResults) {
    boardGamesSearchResults.boardGames = [];
    boardGamesSearchResults.showSpinner = true;
    boardGamesSearchResults.search = true;
    boardGamesSearchResults.error = null;
}

export {
    fetchData,
    xmlToJson,
    mapBoardGamesDetailData,
    refreshSearchResults,
    getBoardGamesCollection,
    getBoardGameInfo,
    getLoggedPlays,
    deleteBoardGameFromCollection,
    filterActiveLoggedPlays
};