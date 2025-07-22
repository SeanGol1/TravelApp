import requests, sys , os

def get_countrycode(country_name):
    url = f"https://restcountries.com/v3.1/name/{country_name}?fullText=true"

    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        country_code = data[0]['cca2']
        return(country_code)    

def get_place(city_name, country_name):
    url = "https://wft-geo-db.p.rapidapi.com/v1/geo/places"

    querystring = {"countryIds": get_countrycode(country_name), "namePrefix": city_name, "sort":"-population"}

    headers = {
        "X-RapidAPI-Key": os.environ.get("RAPIDAPI_KEY"),
        "X-RapidAPI-Host": os.environ.get("RAPIDAPI_HOST")
    }

    response = requests.get(url, headers=headers, params=querystring)

    if response.status_code == 200:
        place_data = response.json()
        city_data = place_data['data']
        city_info = {
            "Name" : city_name,
            "Lat" : city_data[0]['latitude'],
            "Lng" : city_data[0]['longitude']
        }
        return(city_info)
        
    else:
        print("Error: ", response.status_code)

if __name__ == '__main__':
    city_name = sys.argv[1]
    country_name = sys.argv[2]
    city_info = get_place(city_name, country_name)
    print (city_info)