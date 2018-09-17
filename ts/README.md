
# Table of Contents

1.  [Get geo location by IP](#orgae892be)


<a id="orgae892be"></a>

# Get geo location by IP

    const geoByIP = new GeoByIP();
    const response = await geoByIP.getLocation(ip);
    console.log(response.city);
