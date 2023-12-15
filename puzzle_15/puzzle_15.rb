file_lines = File.readlines('input.txt', chomp: true)
steps = file_lines[0].split(',')

output = Array.new(256) { {} }

steps.each do |step|
  value = 0
  focal_length = step[/\d+/].to_i
  step.split('').each do |char|
    
    if char.match(/[a-zA-Z]/)
      value += char.ord
      value = value * 17
      value = value % 256
    end
    if char == '-'
      lens = step[0.. step.index(char) -1]
      output[value].delete(lens.to_sym)
    end
    if char == "="
      lens = step[0.. step.index(char) -1]
      output[value][lens.to_sym] = focal_length

    end    
  end
end
 
power = 0
output.each_with_index do |box, position|
  box.each.each_with_index do |(lens, length), index|
    power += (position +1) * (index +1) * length
  end
end

p power