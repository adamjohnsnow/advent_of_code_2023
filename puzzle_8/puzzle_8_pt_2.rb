file_lines = File.readlines('puzzle_8/input.txt', chomp: true)

@instructions = file_lines[0].gsub('L', '0').gsub('R','1').split('')

@map_hash = {}

file_lines[2..-1].each do |line|
  @map_hash[line[0..2]] = [line[7..9],line[12..14]]
end

@elements = @map_hash.select {|key, _| key.end_with?("A") }
p @elements
results = []


def follow_instructions(element)
  count = 0
  key = element[0]
  choices = element[1]
  until key.end_with?("Z") do
    @instructions.each do |step|
      count += 1
      key = choices[step.to_i]
      choices = @map_hash[key]
    end
  end
  count
end

@elements.each do |element|
  results << follow_instructions(element)

end

p results
p results.reduce(:lcm)
