@file = File.readlines('./input.txt', chomp: true)

seeds = @file[0].split(' ')[1..-1]

map_names  = [
              "seed-to-soil map:",
              "soil-to-fertilizer map:",
              "fertilizer-to-water map:",
              "water-to-light map:",
              "light-to-temperature map:",
              "temperature-to-humidity map:",
              "humidity-to-location map:"
            ]


maps = {}

map_names.each_with_index do |map, i|
  name = map.sub(' map:', '')
  lower_boundary = (@file.index(map) + 1)
  upper_boundary = (@file.index(map_names[i+1]) || @file.length)
  raw_maps = @file[lower_boundary .. upper_boundary - 1].reject { |str| str.empty? }
  maps[name] = []
  raw_maps.each do |raw_map|
    maps[name] << raw_map.split(" ").map(&:to_i)
  end
end

locations = []
seeds.each do |seed|
  pointer = seed.to_i

  maps.each do |map|
    map[1..-1].each do |ranges|
      ranges.each do |range|
        if pointer >= range[1] && pointer < range[1]+range[2]
          pointer = pointer + (range[0] - range[1])

          break
        end
      end
    end
  end
  locations << pointer
end

p locations.min