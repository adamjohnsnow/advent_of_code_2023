LIMIT = {red: 14, green: 12, blue: 13 }

def parse_line(line)
  id_and_sets = line.split(/[;:]/)
  id = id_and_sets[0][/\d+/].to_i
  sets = id_and_sets[1..-1]
  minimums = {red: 0, green: 0, blue: 0 }

  sets.each do |set|
    groups = set.split(",")
    
    [:red, :green, :blue].each do |colour|
      x = groups.find { |str| str.include?(colour.to_s) }
      i = x ?  x[/\d+/].to_i : 0
      id = 0 if i > LIMIT[colour]
      minimums[colour] = [minimums[colour], i].max
    end

  end
    power = minimums[:red] * minimums[:green] * minimums[:blue]

    [id, power]
end

sum = 0
power = 0
File.foreach('./puzzle_input_2.txt') do |line|
  id, game_power = parse_line(line)
  sum += id
  power += game_power
end

p sum, power