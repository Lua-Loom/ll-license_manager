ESX = exports["es_extended"]:getSharedObject()

function ll_InitializeDropdown(playerId)
    local playerIds = {}
    for _, player in ipairs(GetPlayers()) do
        table.insert(playerIds, player)
    end
end

RegisterServerEvent('ll_getOnlineIds')
AddEventHandler('ll_getOnlineIds', function()
    local playerIds = {}
    for _, player in ipairs(GetPlayers()) do
        table.insert(playerIds, player)
    end
    TriggerClientEvent('ll_receiveOnlineIds', -1, playerIds)
end)

exports('getOnlinePlayerIds', function()
    local playerIds = {}
    for _, player in ipairs(GetPlayers()) do
        table.insert(playerIds, player)
    end
    return playerIds
end)

---------- THINGS THAT I AM TESTING CAN GO BELOW HERE, EVERYTHING ABOVE IS CURRENT AND WORKING AND MUST REMAIN CLEAN. ------------

-- Example for pulling all license information from the database for use.
RegisterCommand("getlicenseinfo", function(source, args, rawCommand)
    local query = "SELECT type, label FROM licenses"
    local parameters = {}
    MySQL.query(query, parameters, function(result)
        if result and #result > 0 then
            for _, row in ipairs(result) do
                print("License Type:", row.type)
                print("License Label:", row.label)
            end
        else
            print("No licenses found in the database.")
        end
    end)
end, false)